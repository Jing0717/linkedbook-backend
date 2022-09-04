const express = require('express');

const router = express.Router();
const PostsControllers = require('../controllers/posts');
const { isAuth } = require('../service/auth');
const handleErrorAsync = require('../service/handleErrorAsync');

router.delete('/:id', isAuth, handleErrorAsync(PostsControllers.deleteOnePost));

router.patch('/:id', isAuth, handleErrorAsync(PostsControllers.updateOnePost));

router.post('/', isAuth, handleErrorAsync(PostsControllers.createdPosts));

module.exports = router;
