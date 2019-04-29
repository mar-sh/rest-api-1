const express = require('express');
const router = express.Router();

const controller = require('../controllers/web');
const authMiddleware = require('../middlewares/authentication');

const {
  userAuthentication,
  adminAuthorization,
} = authMiddleware;

const {
  getTest,
  postUserRegister,
  postUserLogin,
} = controller;

router.get('/test', userAuthentication, getTest);
router.post('/signup', postUserRegister);
router.post('/signin', postUserLogin);

module.exports = router;