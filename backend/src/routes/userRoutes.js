const express = require('express');
const router = express.Router();
const { registerNewUser, login } = require('../controllers/userController');

router.post('/register', registerNewUser);
router.post('/login', login);

module.exports = router;
