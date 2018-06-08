exports.isSubscribed = (req, res, next) => {
  console.log(req.decoded.subscribed)
  if(!req.decoded.subscribed) {
    return next();
  }
  return res.status(401).send({ success: false, message: 'User has already subscribed' });
}
