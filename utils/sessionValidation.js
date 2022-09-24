import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

const sessionValidation = async (req, res, next) => {
  const token = req.cookies.session_token;
  let error = false;

  if (!token) {
    return res.status(401).send('User is not authorized');
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      error = true;
      return res
        .status(404)
        .cookie('session_token', '', {
          httpOnly: true,
        })
        .send('Token is not valid');
    }
    req.user = user;
  });

  if (error) return;

  const user = await userModel.findById(req.user.id);

  if (!user) {
    return res
      .cookie('session_token', '', {
        httpOnly: true,
      })
      .status(401)
      .send('Session expired, please log in again');
  }

  if (user.terminateSession) {
    await userModel.updateOne(
      { email: user.email },
      { terminateSession: false }
    );
    return res
      .cookie('session_token', '', {
        httpOnly: true,
      })
      .status(401)
      .send('Session expired, please log in again');
  }

  next();
};

export default sessionValidation;
