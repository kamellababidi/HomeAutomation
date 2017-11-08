//npm install mocha require chai --save-dev
//npm install -g mocha

var mysql = require('mysql');
var request = require('request');
var expect = require('chai').expect;
var SocketIOClient = require('socket.io-client');

describe('Check the connection between Server & DataBase', function() {
	var dbConnection;

	beforeEach(function(done) {
		dbConnection = mysql.createConnection({
			host: 'sql11.freemysqlhosting.net',
			user: 'sql11201967',
			password: '4qTvU9Rc1T',
			database: 'sql11201967'
		});
		dbConnection.connect();

		var tablename = 'user';

		dbConnection.query('truncate ' + tablename, done);
	});

	afterEach(function() {
		dbConnection.end();
	});

	it('Post a new user to server then check if it is in db', function(){
		request({
			method: 'POST',
			uri: 'https://home99.herokuapp.com/signup',
			json: { user: {username: 'testuser', password: '1234', email: 'testEmai@rbk.com', image: 'testTmage3'}}
		},function(){
			var queryString = 'SELECT * FROM user';
			dbConnection.query(queryString, function(err,result){
				// expect(result.length).to.equal(1);
				console.log(result)
				expect(result[result.length-1].username).to.equal('testuser');
				done()
			})	
		})
	});

	it('Should output all users from the DB', function() {
		// var queryString ='INSERT INTO user (username, password, email, image) VALUES (testuser2, 12345, testEmai@rbk.com, testTmage); ';
		var queryString = "insert into user (name,password,image) values ('userTestLogIn2', '$2a$10$i8Cjuon.BtrCdla7gbroNujAgxQDJoCLpBpg44sxRKiFExFBpqhla', image);";
		dbConnection.query(queryString, function(err){
			if(err){throw err;}
			request({
				method: 'POST',
				uri: 'https://home99.herokuapp.com/login',
				headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
				body: JSON.stringify({ user:{username: 'userTestLogIn2', password: '12345'}})
			},function(error, response, body){
				var userLog = JSON.parse(body);
				expect(userLog).to.equal('done');				
			})
		})	
	});

	it('Should send a message then resive it again', function(){

		this.socket = SocketIOClient('https://home99.herokuapp.com/');

		this.socket.emit('message', {user: 'user1', text: "message from user1", date:"(new Date).toString()"});

		this.socket.on('msg', (data)=> {
	      expect(data[data.length-1]).to.equal({user: 'user1', text: "message from user1", date:"(new Date).toString()"});
	    })
	})
});