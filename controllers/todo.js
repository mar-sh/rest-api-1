const { Todo } = require('../models');

module.exports = {

  getAllTodosByUserId(req, res, next) {
    const user_id = req.authenticated.id;

    Todo.findAll({ where: { user_id }})
      .then((todos) => {
        res.status(200).json({
          message: 'FETCHED',
          todos,
        });
      })
      .catch((error) => {
        next(error);
      });
  },

  getTodoById(req, res, next) {
   const { id } = req.params;

    Todo.findByPk(id)
      .then((todo) => {
        res.status(200).json({
          message: 'FETCHED',
          todo,
        });
      })
      .catch((error) => {
        next(error);
      });
  },

  postCreateTodo(req, res, next) {
    const newTodo = new Todo({
      title: req.body.title,
      description: req.body.description,
      user_id: req.authenticated.id,
    });

    newTodo.save()
      .then((todo) => {
        res.status(201).json({
          message: 'CREATED',
          todo,
        });
      })
      .catch((error) => {
         next(error);
      });
  },

  deleteTodoById(req, res, next) {
    const { id } = req.params;

    Todo.findByPk(id)
      .then((todo) => {
        return todo.destroy();
      })
      .then(() => {
        res.status(204).json();
      })
      .catch((error) => {
        next(error);
      });
  },

  putEditTodoById(req, res, next) {
    const { id } = req.params;

    const updated = {
      title: req.body.title,
      description: req.body.description,
      user_id: req.authenticated.id,
    };

    Todo.findByPk(id)
      .then((todo) => {
        return todo.update(updated);
      })
      .then((updated) => {
        res.status(200).json({
          message: 'UPDATED',
          updated,
        });
      })
      .catch((error) => {
        next(error);
      });
  },

  patchEditTodoById(req, res, next) {
    const { id } = req.params;
    const updated = req.body.title ? req.body.title : req.body.description;
    const target = req.body.title ? 'title' : 'description';

    Todo.findByPk(id)
      .then((todo) => {
        return todo.update({ [`${target}`]: updated })
      })
       .then((updated) => {
         res.status(200).json({
           message: 'UPDATED',
           updated,
         });
       })
       .catch((error) => {
         next(error);
       });
  },

};