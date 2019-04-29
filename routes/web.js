const express = require('express');
const router = express.Router();

const controller = require('../controllers/web');

const {
  getTest,
  postUserRegister,
  postUserLogin,
} = controller;

router.get('/test', getTest);
router.post('/signup', postUserRegister);
router.post('/signin', postUserLogin);

module.exports = router;