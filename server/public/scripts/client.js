console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  $( '#addJokeButton' ).on( 'click', function(){
    console.log( 'addJokeButton on click');
    var newJoke = {
      whoseJoke:$('#whoseJokeIn').val(),
      jokeQuestion:$('#questionIn').val(),
      punchLine:$('#punchlineIn').val(),
    };

    $.ajax({
      type: 'POST',
      url: '/addjoke',
      data: newJoke,
      success: displayJokes,
    });
  }); // end addJokeButton on click
    displayJokes();
}); // end doc ready

function displayJokes(){
  $('#outputDiv').empty();
  console.log('sending request for jokes');
  $.ajax({
    type: 'GET',
    url: '/getjokes',
    success: function(response){
      console.log('got response: ' + response);
      for (var i = 0; i < response.length; i++) {
        console.log(response[i]);
        $('#outputDiv').append('<p>' + response[i].whoseJoke + ':</p>');
        $('#outputDiv').append('<p>Q: ' + response[i].jokeQuestion + '</p>');
        $('#outputDiv').append('<p>A: ' + response[i].punchLine + '</br></br></p>');
      }
    }
  });
}
