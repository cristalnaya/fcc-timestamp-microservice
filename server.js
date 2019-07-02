// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');

app.use((req, res, next) => {
  console.log(`${req.method} request made to '${req.path}' from ${req.ip}`);
  next();
})

app.use(cors({
  optionSuccessStatus: 200
})); // some legacy browsers choke on 204
// http://expressjs.com/en/starter/static-files.html
app.use(express.static(`${__dirname}/public`))


// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => res.sendFile(`${__dirname}/views/index.html`));
app.get(`/api/timestamp/`, (req, res) => {
  let date = new Date();
  return res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// your first API endpoint... 
app.get("/api/timestamp/:date_string", function (req, res) {
  const input = req.params.date_string;
  const response = {
    unix: 0,
    utc: ''
  };
  
  let date;
  if (input.match(/\D/)) {
    date = new Date(input);
  } else {
    date = new Date(Number(input));
  }
  
  response.unix = date.getTime();
  response.utc = date.toUTCString();
  console.log(response.unix = date.getTime());

  if (!response.unix) {
    return res.json({
      err: 'Invalid Date'
    });
  } else {
    return res.json(response);
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});