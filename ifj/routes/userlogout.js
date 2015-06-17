var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	//if(req.user_session) 
		req.user_session.reset();
  res.redirect('/login');
});



module.exports = router;
