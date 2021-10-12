const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoute = require("./routes/user");
const morgan = require('morgan')

//Swagger configuration
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

// settings
const app = express();
const PORT = process.env.SERVER_PORT || 9000;
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const mongoURL = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`;
// middlewares
app.use(express.json());
app.use(morgan("dev"))
app.use("/", userRoute);
app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// routes
app.get("/", (req, res) => {
  res.send("API documentada con Swagger :D !!");
});



// mongodb connection
mongoose
  .connect(mongoURL)
  .then(() => console.log("Connected to MongoDB :D"))
  .catch((error) => console.error(error));

// server listening
app.listen(PORT, () => console.log(`Server is running ${SERVER_HOSTNAME}:${PORT} :D`));
