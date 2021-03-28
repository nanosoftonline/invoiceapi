require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Routes = require("./routes")

const app = express();
app.use(express.json());
app.use(cors()); //cross-origin resource sharing

app.use("/", Routes)
const PORT = process.env.PORT
app.listen(PORT, () => console.log('running on port: ' + PORT))