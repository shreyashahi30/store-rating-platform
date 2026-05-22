const Store = require('../models/Store');

const Rating = require('../models/Rating');

const User = require('../models/User');

exports.dashboard = async (
  req,
  res
) => {
  try {
    const store =
      await Store.findOne({
        where: {
          ownerId: req.user.id,
        },

        include: [
          {
            model: Rating,

            include: [
              {
                model: User,

                attributes: [
                  'id',
                  'name',
                  'email',
                ],
              },
            ],
          },
        ],
      });

    if (!store) {
      return res.status(404).json({
        message: 'Store not found',
      });
    }

    const ratings =
      store.Ratings || [];

    const averageRating =
      ratings.length > 0
        ? (
            ratings.reduce(
              (acc, curr) =>
                acc + curr.rating,
              0
            ) / ratings.length
          ).toFixed(1)
        : 0;

    res.json({
      storeName: store.name,
      averageRating,
      ratings,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};