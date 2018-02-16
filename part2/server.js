let fs = require('fs');
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let port = process.env.PORT || 8000;

app.get('/', function(req, res) {
  let theData = fs.readFileSync('storage.json', "utf8");
  res.send(theData);
});

app.get('/:name', function(req, res) {
  let theName = fs.readFileSync('storage.json', "utf8");
  let theJsonData = JSON.parse(theName);
  if (theJsonData.name === req.params.name) {
    res.send(theJsonData);
  } else {
    res.sendStatus(404)
  }
});

app.post('/create/:name/:age', function(req, res) {
  let theObj = {
    name:`${req.params.name}`,
    age:`${req.params.age}`
  }
  fs.writeFile('storage.json', JSON.stringify(theObj), (err) => {
    if (err) {
      throw err;
    }
  });
  res.sendStatus(200);
});

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});
