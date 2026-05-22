const express = require('express');

const router = express.Router();

const authMiddleware = require(
  '../middleware/authMiddleware'
);

const {
  getStores,
} = require('../controllers/storeController');

router.get(
  '/',
  authMiddleware,
  getStores
);

module.exports = router;