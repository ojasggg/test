const express = require("express");
const bodyParser = require("body-parser");
require("./database/db");

const userRouter = require('./route/registrationRoute');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.use(userRouter);


app.listen(90);