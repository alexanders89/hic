const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static('public'))

var machineOne = {
  "name" : "Machine One",
  "currentJph" : 0,
  "currentState" : "Default",
  "topFaults" : []
}

function update(newJph, newState, newFault){
  machineOne.currentJph = newJph
  machineOne.currentState = newState
  machineOne.topFaults = newFault
}

app.get('/machineone', function(req, res){
  res.send(machineOne)
})

app.post('/machineOne', function(req, res){
  console.log(req.body)
  res.send("Hello")
})


app.listen(process.env.PORT || 8080, () => console.log('all is ok'))
