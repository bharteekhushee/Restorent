const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config()

const bodyParser=require ('body-parser')
app.use(bodyParser.json()) // req.body

app.get('/', function (req, res) {
    res.send('Welcome to my hotel...');
})

//person routes 
const personRoutes=require('./routes/personRoutes')
const menuItemRoutes=require('./routes/menuItemRoutes')

app.use('/person',personRoutes)
app.use('/menu',menuItemRoutes)

const PORT=process.env.PORT||3005;
app.listen(PORT, () => {
    console.log("Listening on Port:-"+PORT)
})