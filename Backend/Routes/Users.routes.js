const router = require('express').Router();
const {Register,Login} = require('../Controllers/user.controller');

router.post('/register',Register);
router.post('/login',Login);



module.exports = router;