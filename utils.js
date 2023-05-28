import jwt from 'jsonwebtoken';

const checkAdminAccess = (token) => {
  let role = null;
  jwt.verify(token, process.env.TOKEN_SECRET, function (err, decoded) {
    if (err) {
      return;
    }
    role = decoded.role; // bar
  });
  return role === 'admin';
}

const checkAdminAccessMiddleWare = (req, res, next) => {
  if (!checkAdminAccess(req.headers['accesstoken'])) {
    res.status(401).send({ msg: 'Not Authorized' });
    return;
  }
  next();
}

export {
  checkAdminAccess,
  checkAdminAccessMiddleWare
};
