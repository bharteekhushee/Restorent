const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config()
const passport=require('./auth')

const bodyParser = require('body-parser')
app.use(bodyParser.json()) // req.body

//custom log
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Requet made to: ${req.originalUrl}`);
    next();
}
//authentication
app.use(passport.initialize())
const localAuthMiddleware=passport.authenticate('local',{session:false});

app.use(logRequest);
app.get('/', function (req, res) {
    res.send('Welcome to my hotel...');
})

//person routes 
const personRoutes = require('./routes/personRoutes')
const menuItemRoutes = require('./routes/menuItemRoutes');

app.use('/person', personRoutes)
app.use('/menu', menuItemRoutes)

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
    console.log("Listening on Port:-" + PORT)
})