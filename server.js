// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

//My App
//"Timestamp Microservice"


var resObj = {}

//"If the date field is an empty parameter, return current time in unix"
app.get('/api/', (req, res) => {
  console.log("this is a blank field");
  resObj['unix'] = new Date().getTime();
  resObj['utc'] = new Date().toUTCString();
  res.json(resObj);
})

app.get(
  '/api/:date?', (req,res) => {
    let date = req.params.date;    
//If valid date, return unix key of input date, utc key of .toUTCString()
    if (isNaN(Date.parse(date)) == false) {
      console.log("this is a valid date");
      resObj['unix'] = new Date(date).getTime();
      resObj['utc'] = new Date(date).toUTCString();
      res.json(resObj);
//If the request is a unix key, return the key, as well as the key in the utc version
    } else if (date > 0) {
          console.log("this is a timestamp")
          date = parseInt(date)
          resObj['unix'] = new Date(date).getTime();
          resObj['utc'] = new Date(date).toUTCString();
          res.json(resObj);
        }  else {
            res.json({error: "Invalid Date"})  
      }
  })

