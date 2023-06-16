require("dotenv").config();
const express = require("express");
const securityMiddleware = require("./security");

const app = express();

securityMiddleware(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Your routes here...

app.listen(3000, () => console.log("Server started on port 3000"));
