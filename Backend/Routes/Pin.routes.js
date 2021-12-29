const router = require('express').Router();
const {CreatePin,GetAllPin} = require('../Controllers/pin.controller')

router.post('/create',CreatePin);
router.get('/all',GetAllPin);

module.exports= router;