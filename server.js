var express = require('express');
var bodyParser = require('body-parser');
let database = require('./database.json');
const fs = require('fs');

var app = express()
var jsonParser = bodyParser.json()

app.post('/add-flat', jsonParser, (req, res) => {
  database.push(req.body)
  fs.writeFile('database.json', JSON.stringify(database,null,2), ()=> console.log('writing base...'))
});

app.post('/rent-flat', jsonParser, (req, res)=>{
  let rent = req.body;
  const { client, clientPhone, lease, active } = rent;
  let flat = database.find(el=>el.id === rent.id);
  Object.assign(flat,{
    client,
    clientPhone,
    lease,
    active
  })
  fs.writeFile('database.json', JSON.stringify(database,null,2), ()=> console.log('writing base...'))
})

app.post('/delete-order', jsonParser, (req, res) => {
  let id = req.body.id;
  let flat = database.find(el=>el.id === id);
  Object.assign(flat,{
    client: '',
    clientPhone: '',
    lease: '',
    active: true
  })
  fs.writeFile('database.json', JSON.stringify(database,null,2), ()=> console.log('writing base...'))
});

app.post('/delete-flat', jsonParser, (req, res) => {
  let id = req.body.id;
  database = database.filter(el=>el.id!=id);
  fs.writeFile('database.json', JSON.stringify(database,null,2), ()=> console.log('writing base...'))
});

app.get('/get-flats', (req, res)=> res.json(database))

app.listen(8080, ()=> console.log('---------------\nСтраница для клиентов: http://localhost:8080/client.html\nСтраница для администратора: http://localhost:8080/admin.html\n---------------'))
app.use(express.static('./static'))
