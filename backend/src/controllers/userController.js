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


// const updatePassword = async (req, res) => {
//   try {
//     const { currentPassword, newPassword } = req.body;

//     const user = await User.findById(req.user._id);
//     console.log(user)
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Compare the current password with the user's saved password
//     const isMatch = await bcrypt.compare(currentPassword, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Incorrect current password' });
//     }

//     // Hash the new password
//     // const hashedPassword = await bcrypt.hash(newPassword, 10);

//     // Update the user's password
//     user.password = hashedPassword;
//     await user.save();

//     return res.status(200).json({ message: 'Password updated successfully' });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Server Error' });
//   }
// };


//update password
const updatePassword = async (req, res) => {
  // #swagger.tags = ['auth']

  try {
    const { currentPassword, newPassword } = req.body;
    if (
      currentPassword.length < 6

      // !newPassword.match(
      //   /(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$/
      // )
    ) {
      return ErrorHandler(
        "Password must be 6 characters long",
        // "Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character",
        400,
        req,
        res
      );
    }
    const user = await User.findById(req.user.id).select("+password");
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return ErrorHandler("Currrent Password Incorrect", 400, req, res);
    }
    const samePasswords = await user.comparePassword(newPassword);
    if (samePasswords) {
      return ErrorHandler(
        "New password cannot be same as old password",
        400,
        req,
        res
      );
    }
    user.password = newPassword;
    await user.save();
    return SuccessHandler("Password updated successfully", 200, res);
  } catch (error) {
    return ErrorHandler(error.message, 500, req, res);
  }
};


const updatePasswordd = async (req, res) => {
  // #swagger.tags = ['auth']

  try {
    const { currentPassword, newPassword } = req.body;
    console.log(currentPassword)
    console.log(newPassword)
    if (
      password.length < 6

      // !newPassword.match(
      //   /(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$/
      // )
    ) {
      return ErrorHandler(
        "Password must be 6 characters long",

        // "Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character",
        400,
        req,
        res
      );
    }
    const user = await User.findById(req.user.id).select("+password");
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return ErrorHandler("Invalid credentials", 400, req, res);
    }
    const samePasswords = await user.comparePassword(newPassword);
    if (samePasswords) {
      return ErrorHandler(
        "New password cannot be same as old password",
        400,
        req,
        res
      );
    }
    user.password = newPassword;
    await user.save();
    return SuccessHandler("Password updated successfully", 200, res);
  } catch (error) {
    return ErrorHandler(error.message, 500, req, res);
  }
};
module.exports = { updateProfile, getProfile, makePremium, updatePassword, updatePasswordd };
