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

//Display the file content
app.get('/file/:file:extension', function(req, res){
    //utilities
    var file = req.params.file,
        extension = req.params.extension;
    //utilities in action
    fs.readFile('./' + file + extension, 'utf8', function(err, data){
        res.render('display', {fileData: data});
        console.log('Now displaying the file ' + file + extension);
    }, (error) => {});
});

//display the file content and then save it to another file
app.get('/file/:file:extension/:command/:destination:destExtension', function(req, res){
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

//delete the specified file from your directory
app.get('/file/:file:extension/:command', function(req, res){
    //utilities
    var file = req.params.file,
        command = req.params.command,
        extension = req.params.extension;
    //utilities in action
    if(command === 'delete') {
        fs.unlink('./' + file + extension, (error) => {});
        console.log('The file ' + file + extension + ' has been deleted');
        res.send(file + extension + ' has been removed from your computer');
    }
});

//write files and save them directly from the browser
app.get('/data', function(req, res){
    var user_data = req.query.data;
    //check if the user has defined --js at index[0], means that it's a js file
    function checkFileType_js(){
        if(user_data.search(/--js/) === 0) {
            fs.writeFile('./user_data.js', user_data.replace(/--js/, ''), (error) => {});
            console.log('Saved the user data as a javascript file');
        }
        else {
            console.log('This is not javascript code');
        }
    }
    //check if the user has defined --txt at index[0], means that it's a txt file
    function checkFileType_txt(){
        if(user_data.search(/--txt/) === 0) {
            fs.writeFile('./user_data.txt', user_data.replace(/--txt/, ''), (error) => {});
            console.log('Saved the user data as a text file');
        }
        else {
            console.log('This is not a text file');
        }
    }
    //check if the user has defined --json at index[0], means that it's a JSON file
    function checkFileType_json(){
        if(user_data.search(/--json/) === 0) {
            fs.writeFile('./user_data.json', user_data.replace(/--json/, ''), (error) => {});
            console.log('Saved the user data as a json(javascript object notation file)');
        }
        else {
            console.log('This is not a json file');
        }
    }
    
    res.send('hot stuff');
    checkFileType_js();
    checkFileType_txt();
    checkFileType_json();
});