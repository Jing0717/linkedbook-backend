function handleSuccess(res, data) {
  res.status(200).json({
    data,
  });
}

module.exports = handleSuccess;
