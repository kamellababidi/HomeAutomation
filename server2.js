var express = require('express');
var app = express();
var bluetooth = require('node-bluetooth');
var bodyParser = require('body-parser');
require('events').EventEmitter.prototype._maxListeners = 100;
app.use(function (req, res, next) {

   // Website you wish to allow to connect
   res.setHeader('Access-Control-Allow-Origin', '*');

   // Request methods you wish to allow
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

   // Request headers you wish to allow
   res.setHeader('Access-Control-Allow-Headers', '*');

   // Set to true if you need the website to include cookies in the requests sent
   // to the API (e.g. in case you use sessions)
   res.setHeader('Access-Control-Allow-Credentials', true);

   // Pass to next layer of middleware
   next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());




//scan in bluetooth 
app.get('/scan',(req,res) =>{
  const devices={
    addresses:[],
    names:[]
  };
  var device = new bluetooth.DeviceINQ();
  device
  .on('finisqhed', console.log.bind(console, 'finished'))
  .on('found',(address,name) =>{
    devices.addresses.push(address);
    devices.names.push(name);
    console.log("address is===> "+address+" the name is===> "+name)
  }).inquire();
  res.send(JSON.stringify(devices))
})



// connect to bluetooth device
var connect;
app.get('/connect',(req,res)=>{
  if(connect!==undefined){
    return res.send(JSON.stringify('already connected'));
  }
  bluetooth.connect('98-d3-31-b3-12-a1',1,(err,connection)=>{
    if(err){
      throw err
    }else{
      console.log('connected')
      connect=connection
      //connection.write('1', 'utf-8');
      res.send(JSON.stringify('doneeee'));
    }
  })
})





// handle motion sensor
app.get('/motion',(req,res) =>{
  if(connect==undefined){
    console.log("please connect first")
    return res.send(JSON.stringify("p"))
  }
  var buf= new Buffer('d', 'utf-8')
  var x="dd";
  console.log("motion")
  connect.write(new Buffer(buf),function(){
    connect.on('data', (buffer) => {
       
    console.log("hiiiiiii")
    //console.log(buffer)
    buf=buffer.toString('utf-8')
     console.log(buffer.toString('utf-8'));
    // console.log(str.split('/n', 0, 2))
    // x=buffer.toString();
    // res.set('Content-Type', 'text/plain');
    // res.status(200);
    // return res.send(JSON.stringify("ffff"))
    
    // //return res.send(JSON.stringify(x))
    // //console.log("the x is===> ",x)
  });
  });
  //setTimeout(function(){}, 2000);
  
  //setTimeout(function(){return res.send(JSON.stringify(x))}, 2000);
  //return res.send();
 setTimeout(function(){
  console.log("hhhhhhh",buf.toString("utf-8")); 
  return res.json(buf.toString("utf-8"))
 }, 1000);

})

// Get the tempreturre from the sensor 
app.get('/temp',(req,res) =>{
  if(connect==undefined){
    console.log("please connect first")
    return res.send(JSON.stringify("p"))
  }
    var buf= new Buffer('t', 'utf-8')
    var x="tempretute";
    console.log("tempretute")
    connect.write(new Buffer(buf),function(){
        connect.on('data', (buffer) => {
          
        console.log("temp")
        buf=buffer.toString('utf-8')
    console.log(buf);
 });
    });
setTimeout(function(){
    console.log("temp",buf.toString("utf-8"));
    return res.json(buf.toString("utf-8"))
}, 1000);
})

// Get the alert from gas sensor 
app.get('/gas',(req,res) =>{
  if(connect==undefined){
    console.log("please connect first")
    return res.send(JSON.stringify("p"))
  }
    var buf= new Buffer('i', 'utf-8')
    var x="Gas ";
    console.log("Gas ")
    connect.write(new Buffer(buf),function(){
        connect.on('data', (buffer) => {
          
        console.log("Gas sensor")
        buf=buffer.toString('utf-8')
    console.log(buf);
 });
    });
setTimeout(function(){
    console.log("Gas",buf.toString("utf-8"));
    return res.json(buf.toString("utf-8"))
}, 2000);
})

<<<<<<< HEAD
//turn on the fan
=======
//turn on the lights
>>>>>>> origin
app.get('/on',(req,res)=>{
  connect.write(new Buffer('1', 'utf-8'),function(){});
  res.send(JSON.stringify('on'))
})

//turn off the fan 
app.get('/off',(req,res)=>{
  connect.write(new Buffer('0', 'utf-8'),function(){});

  res.send(JSON.stringify('off'))
})
//turn on the light
app.get('/onL',(req,res)=>{
  connect.write(new Buffer('2', 'utf-8'),function(){});
  res.send(JSON.stringify('on'))
})

//turn off the light 
app.get('/offL',(req,res)=>{
  connect.write(new Buffer('3', 'utf-8'),function(){});

  res.send(JSON.stringify('off'))
})


//specify port number
var port = process.env.PORT||8000;
//run the server 
app.listen(port,(err) =>{
  if(err)
    throw err
  console.log('listening on 8000')
})