// node modules
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const path = require("path");

// router
const router = require("./controllers");

// helper function
const helpers = require("./utils/helpers");

// sequelize connection
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// port
const PORT = process.env.PORT || 3001;

// initialise express
const app = express();

// creating the store variable = to our sequalize store
const store = new SequelizeStore({
  db: sequelize,
});

// session object
const sess = {
  // the secret is the key that will sign out cookie
  secret: "key that will sign cookie",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  // pass store variable into store option
  store: store,
};

// use our session object
app.use(session(sess));

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

// Inform express.js which template engine to use
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// encode the data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// creating static folder
app.use(express.static(path.join(__dirname, "public")));


// router
app.use(router);


// Listen to server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`)
  sequelize.sync({force: false})
})