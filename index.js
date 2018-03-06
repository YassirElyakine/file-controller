var express = require('express'),
    fs = require('fs');
var app = express();
//server configuration
var server = app.listen(8080, function(){
    console.log('Server is listening to port ' + server.address().port);
});
//set view engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('public'));

//first route
var display = app.get('/:file:extension', function(req, res){
    //utilities
    var file = req.params.file,
        extension = req.params.extension;
    //utilities in action
    fs.readFile('./' + file + extension, 'utf8', function(err, data){
        res.render('display', {fileData: data});
        console.log('Now displaying the file ' + file + extension);
    }, (error) => {});
});

//second route
var write = app.get('/:file:extension/:command/:destination:destExtension', function(req, res){
    //utilities
    var file = req.params.file,
        extension = req.params.extension,
        command = req.params.command,
        destination = req.params.destination,
        destExtension = req.params.destExtension;
    //utilities in action
    if(command === 'save') {
        fs.readFile('./' + file + extension, 'utf8', function(err, data){
            fs.writeFile('./' + destination + destExtension, data, (error) => {});
            console.log('File written to ' + destination + destExtension);
            res.render('write', {file: file + extension, dest: destination + destExtension});
        }, (error) => {});
    }
});

//third route
var DELETE = app.get('/:file:extension/:command', function(req, res){
    //utilities
    var file = req.params.file,
        command = req.params.command,
        extension = req.params.extension;
    if(command === 'delete') {
        fs.unlink('./' + file + extension, (error) => {});
        console.log('The file ' + file + extension + ' has been deleted');
        res.send(file + extension + ' has been removed from your computer');
    }
});