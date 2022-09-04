const handleError = require('../service/handleError');
const handleSuccess = require('../service/handleSuccess');
const appError = require('../service/appError');
const Post = require('../models/postsModel');
const User = require('../models/usersModel');
const mongoose = require('mongoose');

const posts = {
  async getPosts(req, res) {
    const timeSort = req.query.timeSort === 'asc' ? 'createdAt' : '-createdAt';
    const q = req.query.q !== undefined ? { content: new RegExp(req.query.q) } : {};
    const allPosts = await Post.find(q)
      .populate({
        path: 'user', // 會找 PostModal 裡的欄位 user
        select: 'name photo',
      })
      .sort(timeSort);
    handleSuccess(res, allPosts);
    res.end();
  },
  async createdPosts(req, res, next) {
    const { body } = req;
    if (body.content === undefined) {
      return next(appError(400, '你沒有填寫 content 資料', next));
    }
    const newPost = await Post.create({
      user: req.user.id,
      content: body.content,
    });
    return handleSuccess(res, newPost);
  },
  async deleteAllPosts(req, res, next) {
    const deletePosts = await Post.deleteMany({});
    handleSuccess(res, deletePosts);
  },
  async deleteOnePost(req, res, next) {
    const { body, params } = req;
    const deletePost = await Post.deleteOne({
      _id: new mongoose.Types.ObjectId(params.id),
    });
    if (deletePost.deletedCount === 0) {
      return next(appError(400, '沒有此id貼文', next));
    }
    return handleSuccess(res, deletePost);
  },
  async updateOnePost(req, res, next) {
    const { body, params } = req;
    if (body.content === '') {
      return next(appError(400, 'content不可為空', next));
    }
    // runValidators 可以根據 schema 更新
    const patchOnePost = await Post.findByIdAndUpdate(params.id, body, { runValidators: true });
    if (patchOnePost === null) {
      return next(appError(400, '沒有此id貼文，不可編輯', next));
    }
    return handleSuccess(res, patchOnePost);
  },
};

module.exports = posts;
