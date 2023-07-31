import dotenv from 'dotenv';
dotenv.config();

// Express.js, or simply Express, is a back end web application framework for building RESTful APIs with Node.js
import express from 'express';

// import body-parser - helps to parse the request and create the req.body object
import bodyParser from "body-parser";

// import cors - provides Express middleware to enable CORS with various options, connect frontend
import cors from "cors";

// import routes
import routes from "./routes/roleRoutes.js";

import config_env from './config/config_env.js';

const app = express();

// var corsOptions = {
//   origin: "http://localhost:8081"
// };

// Enable CORS for all routes
// app.use(cors(corsOptions));
app.use(cors());

// Parse incoming JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// use router
app.use(routes);

// parse requests of content-type - application/json
// Middleware to parse request body as JSON
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Employee Management application." });
});

// set port, listen for requests
// const PORT = process.env.PORT || 8083;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});