import userModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
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
  const { updatedUserData } = req.body;
  const userFromDb = await userModel.findById(req.params.id);
  // console.log(req.user);

  try {
    console.log(updatedUserData);
    const isPasswordCorrect = updatedUserData.currPassword
      ? bcrypt.compareSync(updatedUserData.currPassword, userFromDb.password)
      : null;
    if (isPasswordCorrect === false) throw 'Invalid current password';

    const newPassword = isPasswordCorrect ? updatedUserData.newPassword : null;
    const user = await userModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: updatedUserData,
        ...(newPassword ? { password: hashPassword(newPassword) } : {}),
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
