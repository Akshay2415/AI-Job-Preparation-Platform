const express = require('express');
const authRoutes = require('./routes/auth.routes')
const cookieparser = require("cookie-parser")

const app = express()

app.use(express.json());
app.use(cookieparser());


/* 
POST - for register user
*/
app.use("/api/auth",authRoutes)


module.exports = app;