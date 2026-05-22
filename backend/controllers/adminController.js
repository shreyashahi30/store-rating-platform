const bcrypt = require('bcryptjs');

const { Op } = require('sequelize');

const User = require('../models/User');

const Store = require('../models/Store');

const Rating = require('../models/Rating');

exports.dashboard = async (
  req,
  res
) => {
  try {
    const totalUsers =
      await User.count();

    const totalStores =
      await Store.count();

    const totalRatings =
      await Rating.count();

    res.json({
      totalUsers,
      totalStores,
      totalRatings,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.addUser = async (
  req,
  res
) => {
  try {
    const {
      name,
      email,
      password,
      address,
      role,
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

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      address,
      role,
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.addStore = async (
  req,
  res
) => {
  try {
    const {
      name,
      email,
      address,
      ownerId,
    } = req.body;

    const store = await Store.create({
      name,
      email,
      address,
      ownerId,
    });

    res.status(201).json(store);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getUsers = async (
  req,
  res
) => {
  try {
    const {
      name,
      email,
      address,
      role,
      sortBy = 'name',
      order = 'ASC',
    } = req.query;

    const where = {};

    if (name) {
      where.name = {
        [Op.like]: `%${name}%`,
      };
    }

    if (email) {
      where.email = {
        [Op.like]: `%${email}%`,
      };
    }

    if (address) {
      where.address = {
        [Op.like]: `%${address}%`,
      };
    }

    if (role) {
      where.role = role;
    }

    const users = await User.findAll({
      where,
      order: [[sortBy, order]],
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getStores = async (
  req,
  res
) => {
  try {
    const {
      name,
      email,
      address,
      sortBy = 'name',
      order = 'ASC',
    } = req.query;

    const where = {};

    if (name) {
      where.name = {
        [Op.like]: `%${name}%`,
      };
    }

    if (email) {
      where.email = {
        [Op.like]: `%${email}%`,
      };
    }

    if (address) {
      where.address = {
        [Op.like]: `%${address}%`,
      };
    }

    const stores =
      await Store.findAll({
        where,
        include: [Rating],
        order: [[sortBy, order]],
      });

    const formattedStores =
      stores.map((store) => {
        const ratings =
          store.Ratings || [];

        const avgRating =
          ratings.length > 0
            ? (
                ratings.reduce(
                  (acc, curr) =>
                    acc + curr.rating,
                  0
                ) / ratings.length
              ).toFixed(1)
            : 0;

        return {
          ...store.toJSON(),
          rating: avgRating,
        };
      });

    res.json(formattedStores);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};