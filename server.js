var express = require("express");
var cors = require("cors");
var Routes = require("./routes")

var app = express();
app.use(express.json());
app.use(cors()); //cross-origin resource sharing

app.use("/", Routes)

app.listen(3000, () => console.log('running on port: ' + 3000))