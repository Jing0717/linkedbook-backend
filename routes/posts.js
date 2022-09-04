const express = require('express');

const router = express.Router();
const PostsControllers = require('../controllers/posts');
const { isAuth } = require('../service/auth');
const handleErrorAsync = require('../service/handleErrorAsync');

router.get('/', isAuth, handleErrorAsync(PostsControllers.getPosts));

router.delete('/', isAuth, handleErrorAsync(PostsControllers.deleteAllPosts));

module.exports = router;
