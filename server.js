const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.use(express.static('public'))

var machineOne = {
  "name" : "Alex",
  "currentJph" : 0,
  "currentState" : "Default",
  "topFaults" : []
}


app.get('/alex', function(req, res){
  res.send(machineOne)
})

app.listen(process.env.PORT || 8080, () => console.log('all is ok'))
