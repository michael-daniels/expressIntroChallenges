let fs = require('fs');
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let port = process.env.PORT || 8000;

app.get('/', function(req, res) {
  let theData = fs.readFileSync('storage.json', "utf8");
  let theJsonData = JSON.parse(theData);
  res.json(theJsonData);
});

app.get('/:id', function(req, res) {
  let theName = fs.readFileSync('storage.json', "utf8");
  let theJsonData = JSON.parse(theName);
  for (let i = 0; i < theJsonData.length; i++) {
    if (theJsonData[i].id === req.params.id) {
      res.json(theJsonData[i]);
      return;
    };
  }
  res.sendStatus(400);

});

app.post('/create/:name/:age', function(req, res) {

  fs.readFile("counter.json", "utf8", (err, data) => {
    console.log(data);
    theCounter = JSON.parse(data);
    theCounter++;
    console.log(theCounter);

    fs.writeFileSync("counter.json", JSON.stringify(theCounter));
    console.log("wrote it");
  });

  let theCount = fs.readFileSync("counter.json", "utf8");

  let theObj = {id: `${theCount}`, name:`${req.params.name}`, age:`${req.params.age}`};

  fs.readFile("storage.json", "utf8", (err, data) => {
    console.log(data);
    let theArray = JSON.parse(data);
    theArray.push(theObj);
    console.log(theArray);


    fs.writeFileSync("storage.json", JSON.stringify(theArray));
    console.log("wrote it");
    res.sendStatus(200);
  })

});

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});
