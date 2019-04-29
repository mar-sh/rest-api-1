const jwt = require('jsonwebtoken');

const { User } = require('../models');
const { Todo } = require('../models');

module.exports = {

  userAuthentication(req, res, next) {
    try {
      if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        const decode = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET);
        
        return User.findByPk(decode.id)
          .then((user) => {
            if(!user) {
              res.status(404).json({ message: 'User not found' });
            } else {
              req.authenticated = decode;
              next();
            };
          })
          .catch((error) => {
            res.status(500).json({ message: error.message });
          });
      } else {
        res.status(400).json({ message: 'Bad request' });
      };
    }

    catch(error){
      next(error);
      res.status(401).json({ message: 'Unauthorized' });
    };
  },

  checkTodoOwnership(req, res, next) {
    const { id } = req.params;

    Todo.findByPk(id)
      .then((todo) => {
        if(!todo) {
          res.status(404).json({ message: 'Not found' });
        } else if(req.authenticated.id != todo.user_id) {
          res.status(401).json({ message: 'Unauthorized' });
        } else if(req.authenticated.roles === 'admin' || req.authenticated.id === todo.user_id) {
          next();
        } else {
          res.status(400).json({ message: 'Bad request' });
        };
      })
      .catch((error) => {
        next(error);
      });
  },

}