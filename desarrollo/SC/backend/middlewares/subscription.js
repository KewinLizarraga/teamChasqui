exports.isSubscribed = (req, res, next) => {
  if(req.decoded.type === 'admin') return next();
  if(!req.decoded.subscribed) {
    return next();
  }
  return res.status(401).send({ success: false, message: 'User has already subscribed' });
}
