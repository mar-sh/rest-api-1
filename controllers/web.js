const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { User } = require('../models');

module.exports = {

  getTest(req, res) {
    res.status(200).json({ message: 'CONNECTED OK' });
  },

  postUserRegister(req, res, next) {
    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
    });

    newUser.save()
      .then((user) => {
        res.status(201).json({
          message: 'CREATED',
          user,
        });
      })
      .catch((error) => {
        next(error);
      });
  },

  postUserLogin(req, res, next) {
    const {
      username,
      password,
    } = req.body;

    User.findOne({ where: { username }})
      .then((user) => {
        if(!user) {
          res.status(404).json({ message: 'User not found' });
        } else {
          const verify = bcrypt.compareSync(password, user.password);

          if(verify) {
            const accessToken = jwt.sign({
              id: user.id,
              username: user.username,
              role: user.role,
            }, process.env.JWT_SECRET);
            
            res.status(200).json({
              message: 'WELCOME',
              accessToken,
              user: {
                userID: user.id,
                username: user.username,
              },
            });
          } else {
            res.status(400).json({ message: 'wrong username/password' });
          }
        }
      })
      .catch((error) => {
        next(error);
      })
  },

};
