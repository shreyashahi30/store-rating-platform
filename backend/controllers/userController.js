const bcrypt = require('bcryptjs');

const User = require('../models/User');

const validatePassword = require(
  '../utils/validatePassword'
);

exports.updatePassword = async (
  req,
  res
) => {
  try {
    const {
      currentPassword,
      newPassword,
    } = req.body;

    const user =
      await User.findByPk(req.user.id);

    const isMatch =
      await bcrypt.compare(
        currentPassword,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        message:
          'Current password incorrect',
      });
    }

    if (
      !validatePassword(newPassword)
    ) {
      return res.status(400).json({
        message:
          'Invalid password format',
      });
    }

    const hashedPassword =
      await bcrypt.hash(
        newPassword,
        10
      );

    user.password = hashedPassword;

    await user.save();

    res.json({
      message:
        'Password updated successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({   message: error.message,
    });
  }
};