const S = require("sequelize");
const db = require("../db");
const bcrypt = require("bcrypt");
//-- User Model
class User extends S.Model {}
User.init(
  {
    email: {
      type: S.STRING,
      allowNull: false,
    },
    password: {
      type: S.STRING,
      allowNull: false,
    },
    salt: {
      type: S.STRING,
    },
  },
  { sequelize: db, modelName: "user" }
);
User.addHook("beforeCreate", function (user) {
  return bcrypt
    .genSalt(16)
    .then((salt) => {
      user.salt = salt;
      return user.hashPass(user.password, user.salt);
    })
    .then((passHashed) => (user.password = passHashed));
});

User.prototype.hashPass = function (password, salt) {
  return bcrypt.hash(password, salt);
};

module.exports = User;
