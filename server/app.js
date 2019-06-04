const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const fs = require('fs');
const index1 = require('./index');

const app = express();

app.use(bodyParser.urlencoded( {extended : false}));
app.use(bodyParser.json());

//test data
let data = [
    {
      todoItemId: 0,
      name: 'an item',
      priority: 3,
      completed: false
    },
    {
      todoItemId: 1,
      name: 'another item',
      priority: 2,
      completed: false
    },
    {
      todoItemId: 2,
      name: 'a done item',
      priority: 1,
      completed: true
    }
];


app.get('/', (req, res) => {
  let timeRunning = Date.now() - index1.time;
  res.status(200).send({'server running for (ms)': timeRunning});
});

app.get('/api/TodoItems', (req, res) => {
  res.status(200).send(data);
});

app.get('/api/TodoItems/Completed', (req, res) => {
  res.status(200).send(data.filter(item => item.completed));
});

app.get('/api/TodoItems/NotCompleted', (req, res) => {
  res.status(200).send(data.filter(item => !item.completed));
});


app.get('/api/TodoItems/:number', (req, res) => {
  res.status(200).send(data.find(item => item.todoItemId == req.params.number));
});

//Validate POST data
function valid_data(item) {
  let valid="";
  if (isNaN(item.todoItemId)) {
    valid += "\nID is not a number";
  } 
  if (typeof item.name != 'string') {
    valid += "\nName is not a string";
  }
  if (isNaN(item.priority)) {
    valid += "\nPriority is not a number";
  } 
  if (item.completed != 'true' && item.completed != 'false') {
    valid += "\nCompleted is not a boolean";
    }
  return valid;
}

//Create message for Error Log file
function toLog(req, status, message) {
  let ua = req.headers['user-agent'].replace(/,/g,'');  //get rid of any commas
  let toLog = `\n${ua},${new Date(Date.now()).toISOString()},${req.method},${req.url},HTTP/${req.httpVersion},${status},${message}`;
  console.log(toLog);
  return toLog;
}

app.post('/api/TodoItems', (req, res) => {
  let badData = valid_data(req.body);
  if (badData == "") {
    if (!data.find(item => item.todoItemId == req.body.todoItemId)) {
      data.push(req.body);
    } else {
      //already there, do nothing
    }
    res.status(201).json(req.body);
  } else {
    fs.appendFile('log.csv', '\n'+toLog(req,500,badData), (err) => {
      if (err) throw err;
    });
    res.status(500).send("Invalid data sent:"+badData);
  }
});

app.delete('/api/TodoItems/:number', (req, res) => {
  let delItem = data.find(item => item.todoItemId == req.params.number);
  data = data.filter(item => item.todoItemId != req.params.number);
  res.status(200).json(delItem);
});

app.get('*', (req, res) => {
  fs.appendFile('log.csv', '\n'+toLog(req,404,''), (err) => {
    if (err) throw err;
  });
res.status(404).send("Not found");
});

module.exports = app;
