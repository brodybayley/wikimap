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


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {

  const userId = req.session.userId;
  const templateVars = { user: userId };

  // Temporary db user to test ajax call with forms
  // const templateVars = { user: 1 };
  res.render("index", templateVars);
});

app.get('/brody', (req, res) => {
  const templateVars = { user: null }
  res.render('brody', templateVars);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
