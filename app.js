var dom = 'localhost' //a var with the DOMAIN right now localhost, we'll see

//EXPRESS SETUP, server stuff I don't yet understand
var express = require('express');
var app = express();
var serv = require('http').Server(app);

app.get('/',function(req,res){
    res.sendFile(__dirname + '/client/index.html');
});
app.use('/client/',express.static(__dirname + '/client'));


serv.listen(2000);
console.log("Server up");

var SOCKET_LIST = {}
//Socket Work, load and initialize socket stuff
var io = require('socket.io')(serv,{});

io.sockets.on('connection', function(socket){
	socket.id = Math.random();
	SOCKET_LIST[socket.id] = socket;
    console.log('socket connection: ' + socket.id);
	
	socket.on('disconnect',function(){
		delete SOCKET_LIST[socket.id]
		console.log(SOCKET_LIST)
	})

});

//setInterval(function(){
	//...emit stuff

//},10);
