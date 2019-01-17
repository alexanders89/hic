const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const client = require('twilio')(accountSid, authToken);

const dotenv = require('dotenv');
dotenv.config();

const ACCOUNTSID = process.env.ACCOUNTSID
const AUTHTOKEN = process.env.AUTHTOKEN

const FROMPHONENUMBER = process.env.AUTHTOKEN
const TOPHONENUMBER = process.env.AUTHTOKEN



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

function update(machineNumber, newObject){
  targetMachine = machineData[`machine${machineNumber}`]
  for (var key in newObject){
    targetMachine[key] = newObject[key]
  }
}

app.get('/allmachine', function(req, res){
  res.status(200).send(machineData)
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

app.post('/test', function(req, res){
  console.log(`******${FROMPHONENUMBER}******`)
  res.send("Hello!")
})




function sendMessage(){
  client.messages
  .create({
    body: `Hi, thanks for texting me!`,
    from: `+${FROMPHONENUMBER}`,
    to: TOPHONENUMBER
  })
  .then(message => console.log(message.sid))
  .done();
}

app.listen(process.env.PORT || 8080, () => console.log('all is ok'))
