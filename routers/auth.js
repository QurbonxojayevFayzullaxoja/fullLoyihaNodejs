const express = require('express')
const router = express.Router();
const { signIn, refreshToken } = require('../controllers/auth')

//SignIn  users
router.post('/user/signin', signIn)

router.post('/refresh-tokens', refreshToken);


module.exports = router