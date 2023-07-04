require('dotenv').config();
const express = require('express');
//const cardStore = require('./stores/cardStore');
const routes = require('./routes/routes');

const app = express();

// Middleware
app.use(express.json());

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
