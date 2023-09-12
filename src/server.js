require('dotenv').config();
const express = require('express');
//const cardStore = require('./stores/cardStore');
const routes = require('./routes/routes');
const security = require('./security');
const app = express();

// Middleware
app.use(express.json());
security(app);
// Routes
app.use('/', routes);

app.use((err, req, res, next) => {
  console.error(err.stack); // log the error stack trace to the console
  res.status(500).send('Something broke!');
});

// Start server
const server = app.listen(3000, () =>
  console.log('Server started on port 3000'),
);

// export app
module.exports = server;
