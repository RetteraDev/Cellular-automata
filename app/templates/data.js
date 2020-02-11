
$(document).ready(function() {
    
    var socket = io.connect('http://192.168.1.100:5050/');

    socket.on('new_cells', data => {
        $(".wrapper").append('<li>'+"J = "+data.J+'</li>');
        console.log(data);
    });

    $('.JSON_form').on('click', function(event) {
        event.preventDefault();
        var data = ( $( "form" ).serializeArray() ), obj = {};
        console.log(data)

        socket.emit('send_cellaular_json', data);

    });
});