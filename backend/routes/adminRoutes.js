const express = require('express');

const router = express.Router();

const authMiddleware = require(
  '../middleware/authMiddleware'
);

const roleMiddleware = require(
  '../middleware/roleMiddleware'
);

const {
  dashboard,
  addUser,
  addStore,
  getUsers,
  getStores,
} = require(
  '../controllers/adminController'
);

router.get(
  '/dashboard',
  authMiddleware,
  roleMiddleware('ADMIN'),
  dashboard
);

router.post(
  '/users',
  authMiddleware,
  roleMiddleware('ADMIN'),
  addUser
);

router.post(
  '/stores',
  authMiddleware,
  roleMiddleware('ADMIN'),
  addStore
);

router.get(
  '/users',
  authMiddleware,
  roleMiddleware('ADMIN'),
  getUsers
);

router.get(
  '/stores',
  authMiddleware,
  roleMiddleware('ADMIN'),
  getStores
);

module.exports = router;