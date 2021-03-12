// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const morgan = require('morgan');
const cookieSession = require('cookie-session');
const methodOverride = require('method-override');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json())  //encoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));
app.use(cookieSession({
  name: 'session',
  keys: ['wiki', 'map', 'is awesome']
}));
app.use(methodOverride('_method'));

// Separated Routes for each Resource
const usersRoutes = require("./routes/users");
const registerRoutes = require("./routes/register");
const loginRoutes = require("./routes/login");
const mapsRoutes = require("./routes/maps");
const pointsRoutes = require("./routes/points");

// Mount all resource routes
app.use("/api/users", usersRoutes);
app.use("/register", registerRoutes);
app.use("/login", loginRoutes);
app.use("/api/maps", mapsRoutes);
app.use("/api/maps", pointsRoutes);

// Temporary helper func, to be moved w/ all other clients routes to clients.js
const { getUserById } = require('./db/queries/users-queries');

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  const userId = req.session.userId;
  getUserById(userId)
    .then(user => {
      const templateVars = { user };
      res.render("index-map-popup", templateVars);
    });
});

app.get('/maps', (req, res) => {
  const userId = req.session.userId;
  getUserById(userId)
    .then(user => {
      const templateVars = { user };
      res.render("maps", templateVars);
    });
});


app.post('/logout', (req, res) => {
  req.session = null;
  res.send('Sign out successful: redirecting back to home page.');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
