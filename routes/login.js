var express = require('express');
var router = express.Router();
var LoginControllers = require('../controllers/login')


router.get('/all',LoginControllers.ALL)

router.post('/singup',LoginControllers.SINGUP)

router.post('/login',LoginControllers.USERLOGIN)

module.exports = router;  