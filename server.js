const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

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

app.put('/machineOne', function(req, res){
  res.send("req.body")
})


app.listen(process.env.PORT || 8080, () => console.log('all is ok'))
