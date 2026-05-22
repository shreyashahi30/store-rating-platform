const bcrypt = require('bcryptjs');

const User = require('../models/User');

const generateToken = require(
  '../utils/generateToken'
);

const validatePassword = require(
  '../utils/validatePassword'
);

exports.signup = async (req, res) => {
  try {
    const {
      name,
      email,
      address,
      password,
    } = req.body;

    const existingUser =
      await User.findOne({
        where: { email },
      });

    if (existingUser) {
      return res.status(400).json({
        message:
          'Email already exists',
      });
    }

    if (
      !validatePassword(password)
    ) {
      return res.status(400).json({
        message:
          'Password must contain uppercase letter, special character and 8-16 length',
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      address,
      password: hashedPassword,
      role: 'USER',
    });

    res.status(201).json({
      message: 'Signup successful',
    });
  } catch  (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } =
      req.body;

    const user =
      await User.findOne({
        where: { email },
      });

    if (!user) {
      return res.status(400).json({
        message:
          'Invalid credentials',
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({        message:
          'Invalid credentials',
      });
    }

    const token = generateToken(user);

    res.json({
      token,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};