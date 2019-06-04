const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

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
  res.status(200).send({ 'status' : 'ok'});
});

app.get('/api/TodoItems', (req, res) => {
  res.status(200).send(data);
});

app.get('/api/TodoItems/:number', (req, res) => {
  res.status(200).send(data.find(item => item.todoItemId == req.params.number));
});

app.post('/api/TodoItems', (req, res) => {
  if (!data.find(item => item.todoItemId == req.body.todoItemId)) {
    data.push(req.body);
  } else {
    //already there, do nothing
  }
  res.status(201).json(req.body);
});

app.delete('/api/TodoItems/:number', (req, res) => {
  let delItem = data.find(item => item.todoItemId == req.params.number);
  data = data.filter(item => item.todoItemId != req.params.number);
  res.status(200).json(delItem);
});

app.get('*', (req, res) => {
  res.status(404).send("Not found");
});

module.exports = app;
