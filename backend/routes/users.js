var express = require('express');
var router = express.Router();
const controller = require("../controller")

/* GET users listing. */
router.get('/', controller.getUsers);

module.exports = router;
