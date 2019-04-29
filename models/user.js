"use strict";
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      role: {
        type: DataTypes.STRING,
        defaultValue: "user",
      },
    },
    {
      hooks: {
        beforeSave: (instance, options) => {
          instance.password = bcrypt.hashSync(instance.password, 8);
        },
      },
    }
  );
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
