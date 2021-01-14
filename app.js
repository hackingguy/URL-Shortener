require('dotenv').config();
var express = require('express');
var path = require('path');
var indexRouter = require('./routes/index');
var shortenRouter = require('./routes/shorten');
var redirectRoute = require('./routes/redirect')
var connectDB = require('./config/db')
var app = express();

connectDB();

//Favicon
app.use('/favicon.ico', express.static('./public/images/favicon.ico'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/i',redirectRoute);
app.use('/api', shortenRouter);
app.use((req,res)=>{
    res.status(404).render("Page-Not-Found");
})

module.exports = app;