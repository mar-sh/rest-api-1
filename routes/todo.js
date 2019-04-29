const express = require('express');
const router = express.Router();

const controller = require('../controllers/todo');
const authMiddleware = require('../middlewares/authentication');

const {
  userAuthentication,
  checkTodoOwnership,
} = authMiddleware;

const {
  getAllTodosByUserId,
  getTodoById,
  postCreateTodo,
  putEditTodoById,
  patchEditTodoById,
  deleteTodoById,
} = controller;

router.use(userAuthentication);

router.get('/', getAllTodosByUserId);
router.get('/:id', checkTodoOwnership ,getTodoById);
router.post('/', postCreateTodo);
router.delete('/:id', checkTodoOwnership ,deleteTodoById);
router.put('/:id', checkTodoOwnership ,putEditTodoById);
router.patch('/:id', checkTodoOwnership ,patchEditTodoById);


module.exports = router;