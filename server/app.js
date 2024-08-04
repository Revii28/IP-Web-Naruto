console.log({ env: process.env.NODE_ENV });
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const cors = require("cors");
const express = require("express");
const app = express();
const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");
// const port = process.env.port || 3000
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(routes);
app.use(errorHandler);

// app.listen(port, () => {
//   console.log(`jalan di port ${port}`)
// })

module.exports = app;
