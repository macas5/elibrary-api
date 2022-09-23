import userModel from '../models/userModel.js';
import hashPassword from '../utils/hashPassword.js';

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await userModel.find({}, { password: 0 });
    res.status(202).json(allUsers);
  } catch (error) {
    console.error(error);
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    const { password, ...remainingUserData } = user._doc;
    res.status(200).json(remainingUserData);
  } catch (error) {
    res.status(405).send(error);
    console.error(error);
  }
};

export const getOwnUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);
    const { password, ...remainingUserData } = user._doc;
    res.status(200).json(remainingUserData);
  } catch (error) {
    res.status(405).send(error);
    console.error(error);
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await userModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
        ...(req.body.password
          ? { password: hashPassword(req.body.password) }
          : {}),
        ...(!req.user.isAdmin ? { isAdmin: false } : {}),
        ...(Object.keys(req.body).includes('isAdmin') && req.user.isAdmin
          ? { terminateSession: true }
          : {}),
      },
      { new: true }
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(405).send(error);
    console.error(error);
  }
};
