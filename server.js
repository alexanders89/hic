const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const dotenv = require('dotenv');
dotenv.config();

//const ACCOUNTSID = process.env.accountSid
//const AUTHTOKEN = process.env.authToken

//const FROMPHONENUMBER = process.env.fromNumber
//const TOPHONENUMBER = process.env.toNumber

//const client = require('twilio')(ACCOUNTSID, AUTHTOKEN);

//const MessagingResponse = require('twilio').twiml.MessagingResponse;


app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static('public'))

var machineData = {
  "machine1" : {
    "name" : "Machine One",
    "jph" : 10,
    "state" : "Machine One State",
    "faults" : [1,1,1]
  },
  "machine2" : {
    "name" : "Machine Two",
    "jph" : 20,
    "state" : "Machine Two State",
    "faults" : [2,2,2]
  },
  "machine3" : {
    "name" : "Machine Three",
    "jph" : 30,
    "state" : "Machine Three State",
    "faults" : [3,3,3]
  }
}

var lineData = {
  "name" : "Line 1",
  "jph" : 25,
  "state" : "Singing in the rain",
  "buyOffScore" : 10,
  "stoppedOps" : [1,2,3],
  "faultsByTime" : [1,2,3],
  "faultsByOccurancy" : [1,2,3],
  "opsDelta" : [1,2,3]
}

function update(machineNumber, newObject){
  targetMachine = machineData[`machine${machineNumber}`]
  for (var key in newObject){
    targetMachine[key] = newObject[key]
  }
}

function updateLine(newObject){
  for (var key in newObject){
    lineData[key] = newObject[key]
  }
}

app.get('/allmachine', function(req, res){
  res.status(200).send(machineData)
})

app.get('/line', function(req, res){
  res.status(200).send(lineData)
})

app.post('/line', function(req, res){
  updateLine(req.body)
  res.send("Hi")

})


app.get('/machine/:id', function(req, res){
  target = `machine${req.params.id}`
  res.send(machineData[target])
})


app.post('/machine/:id', function(req, res){
  machineNumber = req.params.id
  update(machineNumber, req.body)
  res.send("Hello!")
})

// app.post('/test', function(req, res){
//   const twiml = new MessagingResponse();
//   target = `machine${req.body.Body}`
//   twiml.message(`\nInformation for Operation ${req.body.Body}\nJobs Per Hour: ${machineData[target].jph}\nState: ${machineData[target].state}\nTop Fault: ${machineData[target].faults[0]}\nThanks for using HIC!`);
//   res.writeHead(200, {'Content-Type': 'text/xml'});
//   res.end(twiml.toString());
// })

app.listen(process.env.PORT || 8080, () => console.log('all is ok'))
