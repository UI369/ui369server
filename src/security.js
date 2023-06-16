const helmet = require("helmet");
const morgan = require("morgan");
const csurf = require("csurf");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");

const { CORS_ORIGIN } = process.env;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

module.exports = function securityMiddleware(app) {
  app.use(helmet());
  app.use(morgan("tiny"));
  app.use(limiter);
  app.use(cors({ origin: CORS_ORIGIN }));
  app.use(mongoSanitize());
  app.use(hpp());
  app.use(cookieParser());
  app.use(csurf());
};
