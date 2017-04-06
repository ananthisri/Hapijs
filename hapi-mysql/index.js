var Hapi = require('hapi');
var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'ananthi',
	database: 'hapi'
});


var server = new Hapi.Server();

server.connection({ port:3000});
connection.connect();

server.route({
	method: 'GET',
	path: '/',
 	handler: function(request,reply) {
		
		connection.query('select * from people', function(err, rows, fields){
			if(err) throw err;

			reply('The Id is ' + rows[0].Id + ' and the name is ' + rows[0].Name);
		});
	}
});

server.start(function(){
	console. log('Server is running');
}); 