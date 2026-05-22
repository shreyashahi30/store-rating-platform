const Store = require('../models/Store');

const Rating = require('../models/Rating');

exports.getStores = async (
  req,
  res
) => {
  try {
    const stores =
      await Store.findAll({
        include: [Rating],
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

        const userRating =
          ratings.find(
            (r) =>
              r.UserId === req.user?.id
          );

        return {
          ...store.toJSON(),
          overallRating: avgRating,
          userSubmittedRating:
            userRating?.rating || null,
        };
      });

    res.json(formattedStores);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};