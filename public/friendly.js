var command = document.getElementById('command'),
    btn = document.getElementById('btn');

//Emit click event
btn.addEventListener('click', function(){
    window.location = 'http://localhost:8080/' + command.value.replace(/ /g, '/');
});