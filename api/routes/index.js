const express = require("express");
const router = express.Router();
const User = require("../models/User");
const db = require("../db");
const passport = require("passport");
/*
  ALL YOUR ROUTES HERE!
*/
router.post("/register", (req, res, next) => {
  User.create(req.body)
    .then((user) => {
      res.status(201).send(user);
    })
    .catch(next);
});
router.post("/login", passport.authenticate("local"), (req, res) => {
  const user = req.user;
  console.log("estoy haciendo loggin", req.user);
  res.status(200).json(user);
});

router.get("/me", (req, res) => {
  if (!req.user) {
    return res.sendStatus(401);
  } else {
    res.send(req.user);
  }
});
router.post("/logout", function (req, res) {
  req.logout();
  res.send(200);
});

// Don´t modify this route, keep it at the bottom.
router.use("/", function (req, res) {
  res.sendStatus(404);
});

module.exports = router;
