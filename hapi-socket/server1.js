var Hapi = require('hapi');
var server = new Hapi.Server();

server.connection({ port: 3000});

var io = require('socket.io')(server.listener);

server.register(require('inert'),function(err){
	if (err){
		throw err;
	}

server.route({
	method: 'GET',
	path: '/',
	handler: function(request, reply) {
		reply.file ('index.html');
	}
});

server.start(function(){
	console.log('Server is running at', server.info.uri);
});

});

io.on('connection',function(socket) {
	socket.emit('news', { hello: 'world'});
	socket.on('something', function(data){
		console.log(data);
	});
});