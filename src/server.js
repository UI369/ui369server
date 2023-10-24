require('dotenv').config();
const express = require('express');
//const cardStore = require('./stores/cardStore');
const routes = require('./routes/routes');
const security = require('./security');
const app = express();
const bodyParser = require('body-parser');

// This is the test secret API key.
const stripe = require('stripe')('sk_test_qZRYpxvqiMTgESmzrZz1llKL00fbSvn5Wz');

// Middleware
//app.use(express.json());
//app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

security(app);
// Routes
app.use('/', routes);

app.use((err, req, res, next) => {
  console.error(err.stack); // log the error stack trace to the console
  res.status(500).send('Something broke!');
});

// Start server
const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on port ${process.env.PORT}`),
);

// export app
module.exports = server;
