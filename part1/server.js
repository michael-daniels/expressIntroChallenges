
let path = require('path');
let express = require('express');
let app = express();
let port = process.env.PORT || 8000;

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/hello', function(req, res) {
  res.send("Hello!");
});

app.get('/verify/:age', function(req, res) {
  let theAge = req.params.age;

  if (theAge > 13) {
    res.sendStatus(200);
  } else {
    res.sendStatus(403);
  }
});

app.post('/create/:name', function(req, res) {
  let theObj = {
    id:1,
    name:`${req.params.name}`
  };
  res.json(theObj);
});

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});
