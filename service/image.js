const multer = require('multer');
const path = require('path');
const appError = require('./appError');
const handleErrorAsync = require('./handleErrorAsync');

// img 的守門員
const upload = multer({
  limits: {
    fileSize: 2 * 1024 * 1024, // 2M size,
  },
  fileFilter(req, file, cb) { // cb是middleware
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== '.jpg' && ext !== '.png' && ext !== '.jpeg') {
      cb(new Error('檔案格式錯誤，僅限上傳 jpg、jpeg 與 png 格式。')); // 這邊會進到自己寫的app.use(err) 裡
    }
    cb(null, true);
  },
}).any();// any 的意思是所有檔案我都接收

module.exports = upload;
