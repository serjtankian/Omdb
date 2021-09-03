const express = require("express");
const helmet = require("helmet");
const http = require("http");
const path = require("path");
const app = express();
const db = require("./db");
const User = require("./models/User");
const bcrypt = require("bcrypt");
const sessions = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bodyParser = require("body-parser");

app.use(helmet());
const authAPI = require("../api/routes");

app.use(express.static(path.resolve(__dirname, "./src/public")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  sessions({
    secret: "bootcamp",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    function (email, password, done) {
      User.findOne({ where: { email } })
        .then((user) => {
          if (!user) {
            // email not found
            return done(null, false);
          }

          user.hashPass(password, user.salt).then((hash) => {
            if (hash !== user.password) {
              return done(null, false); // invalid password
            }
            done(null, user); // success :D
          });
        })
        .catch(done);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findByPk(id)
    .then((user) => {
      done(null, user);
    })
    .catch(done);
});

// Express Routing
app.use("/api", authAPI);
/* app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "./src/public", "index.html"));
}); */

db.sync({ force: false }).then(() => {
  http.createServer(app).listen(3001, () => {
    console.log(`Server listening at port ${3001}`);
  });
});
