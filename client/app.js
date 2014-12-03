// YOUR CODE HERE:
$(document).ready(function() {


  var app = {
    server: "http://127.0.0.1:3000/classes/chatterbox",
    room: 'lobby',
    name: prompt("What's your name?"),

    init: function() {
      app.fetch();

      $('.SubmitButton').on('click', function(){
        var msgToSend =  $('#MessageInput').val();

        var msgToServer = JSON.stringify({
          username: app.name,
          text: msgToSend,
          roomname: app.room
        });
        app.send(msgToServer);
        $('#MessageInput').val('');
      });

      $('#chats').on('click', 'a', function() {
        var rm = $(this).text();
        app.fetch(function(data){
          test = data;
          app.roomDisplay(rm, data);
        });
      });
    },

    send: function(message) {
      $.ajax({
        url: app.server,
        type: 'POST',
        data: message,
        contentType: 'application/json',
      });
    },

    fetch: function(callback) {
      $.ajax({
        url: app.server,
        type: 'GET',
        data: {
          order: '-createdAt',
          limit: 10
        },
        contentType: 'application/json',
        success: function(data) {
          callback(data);
        },
      });
    },


    roomDisplay: function(roomname, data){
      $('#sidebar li').remove();
      var roomData = {
        results: []
      };
      $.each(data.results, function(index, msgObj){
        if (msgObj.roomname === roomname){
          roomData.results.push(msgObj);
        }
      });
      $.each(roomData.results, function(index, msgObj){
        $('#sidebar').append('<li>'+ _.escape(msgObj.username) +': ' + _.escape(msgObj.text) + ' |from: '+
          '<a class="room" href="#MessageInput">' + _.escape(msgObj.roomname) + '</a>'+'</li>');
      });
      $container = $('.container');
      $('.container').animate({ scrollTop: $container[$container.length-1].scrollHeight }, "slow");
    },

     display: function(data){
      $.each(data.results, function(index, msgObj){
        $('#chats').append('<li>'+ _.escape(msgObj.username) +': ' + _.escape(msgObj.text) + ' |from: '+
          '<a class="room" href="#MessageInput">' + _.escape(msgObj.roomname) + '</a>'+'</li>');
      });
      $container = $('.container');
      $('.container').animate({ scrollTop: $container[$container.length-1].scrollHeight }, "slow");
    }
  } ;

  app.init();

  setInterval(function(){
    app.fetch(app.display);
  }, 5000);

});

