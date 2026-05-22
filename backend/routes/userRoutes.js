const express = require('express');

const router = express.Router();

const authMiddleware = require(
  '../middleware/authMiddleware'
);

const {
  updatePassword,
} = require(
  '../controllers/userController'
);

router.put(
  '/password',
  authMiddleware,
  updatePassword
);

module.exports = router;