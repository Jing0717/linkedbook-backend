const express = require('express');

const router = express.Router();
const PostsControllers = require('../controllers/posts');
const handleErrorAsync = require('../service/handleErrorAsync');
/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

module.exports = router;
