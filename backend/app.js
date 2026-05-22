const express = require('express');

const cors = require('cors');

require('dotenv').config();

const sequelize = require('./config/db');

require('./models/User');
require('./models/Store');
require('./models/Rating');

const authRoutes = require(
  './routes/authRoutes'
);

const storeRoutes = require(
  './routes/storeRoutes'
);

const ratingRoutes = require(
  './routes/ratingRoutes'
);

const adminRoutes = require(
  './routes/adminRoutes'
);

const userRoutes = require(
  './routes/userRoutes'
);

const storeOwnerRoutes = require(
  './routes/storeOwnerRoutes'
);

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/auth', authRoutes);

app.use('/api/stores', storeRoutes);

app.use('/api/ratings', ratingRoutes);

app.use('/api/admin', adminRoutes);

app.use('/api/users', userRoutes);

app.use(
  '/api/store-owner',
  storeOwnerRoutes
);

app.get('/', (req, res) => {
  res.send('API Running Successfully');
});

sequelize
  .authenticate()
  .then(() => {
    console.log(
      'Database connected successfully'
    );

    return sequelize.sync();
  })
  .then(() => {
    app.listen(
      process.env.PORT || 3000,
      () => {
        console.log(
          `Server running on port ${process.env.PORT}`
        );
      }
    );
  })
  .catch((error) => {
    console.log(
      'Database connection failed:',
      error.message
    );
  });