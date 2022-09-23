import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import hashPassword from '../utils/hashPassword.js';

export const createUser = async (req, res) => {
  const { registerData } = req.body;
  try {
    const hash = hashPassword(registerData.password);
    const newUser = new userModel({
      ...registerData,
      password: hash,
      isAdmin: false,
      booksOwned: [],
      messages: [],
    });
    await newUser.save();
    res.status(201).send('New User is created');
  } catch (error) {
    console.log(error);
    res.status(405).send(error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const user = await userModel.findOne({ username: req.body.username });
    const { password, ...remainingData } = user._doc;
    if (!user) {
      return res.status(404).send('Wrong user or password');
    }

    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return res.status(404).send('Wrong user or password');
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '1 day' }
    );

    return res
      .cookie('session_token', token, {
        httpOnly: true,
      })
      .status(201)
      .json(remainingData);
  } catch (error) {
    res.status(405).send(error);
  }
};

export const logoutUser = async (req, res) => {
  try {
    res
      .cookie('session_token', '', {
        httpOnly: true,
      })
      .send('Cookie deleted');
  } catch (error) {
    console.error(error);
  }
};
