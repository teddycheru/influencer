const ErrorHandler = require("../utils/ErrorHandler");
const SuccessHandler = require("../utils/SuccessHandler");
const User = require("../models/User/user");
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');


const updateProfile = async (req, res) => {
  // #swagger.tags = ['user']
  // #swagger.description = 'Update user profile'
  try {
    const { name, bio, businessLink, blockAds } = req.body;
    const updated = await User.findByIdAndUpdate(req.user._id, {
      $set:
        req.awsImages?.length > 0
          ? {
            name,
            profileImage: req.awsImages?.[0],
            bio,
            businessLink,
            blockAds,
          }
          : {
            name,
            bio,
            businessLink,
            blockAds,
          },
    });
    if (!updated) {
      return ErrorHandler("User does not exist", 400, req, res);
    }
    return SuccessHandler("Profile updated successfully", 200, res);
  } catch (error) {
    return ErrorHandler(error.message, 500, req, res);
  }
};

const getProfile = async (req, res) => {
  // #swagger.tags = ['user']
  // #swagger.description = 'get user profile'
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return ErrorHandler("User does not exist", 400, req, res);
    }
    return SuccessHandler(user, 200, res);
  } catch (error) {
    return ErrorHandler(error.message, 500, req, res);
  }
};

const makePremium = async (req, res) => {
  // #swagger.tags = ['user']
  // #swagger.description = 'mark user as premium'
  try {
    await User.findByIdAndUpdate(
      req.user._id,
      { premium: true, blockAds: true },
      { new: true }
    )
      .then(() => {
        return SuccessHandler("User marked as premium", 200, res);
      })
      .catch((err) => {
        return ErrorHandler("User does not exist", 400, req, res);
      });
  } catch (error) {
    return ErrorHandler(error.message, 500, req, res);
  }
};
const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const { userId } = req.user;

    // Retrieve the user from the database
    const user = await User.findById(userId);

    // Check if the current password matches the user's saved password
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect current password" });
    }

    // Update the user's password
    user.password = newPassword;
    await user.save();

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { updateProfile, getProfile, makePremium, updatePassword };
