const express = require("express");
require("./database/db");
const bodyParser = require("body-parser");
const userRouter = require('./route/registrationRoute')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(userRouter);


app.listen(90);