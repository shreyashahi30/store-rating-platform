const Rating = require('../models/Rating');

exports.submitRating = async (
  req,
  res
) => {
  try {
    const { storeId, rating } =
      req.body;

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        message:
          'Rating must be between 1 and 5',
      });
    }

    const existingRating =
      await Rating.findOne({
        where: {
          UserId: req.user.id,
          StoreId: storeId,
        },
      });

    if (existingRating) {
      existingRating.rating = rating;

      await existingRating.save();

      return res.json({
        message: 'Rating updated',
      });
    }

    await Rating.create({
      rating,
      UserId: req.user.id,
      StoreId: storeId,
    });

    res.json({
      message: 'Rating submitted',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};