require('dotenv').config();
var express = require('express');
var path = require('path');
var net = require('net');
var indexRouter = require('./routes/index');
var shortenRouter = require('./routes/shorten');
var redirectRoute = require('./routes/redirect');
var connectSocket = require('./socket/shortenSocket')
var connectDB = require('./config/db')
var app = express();

//Connect To Database
connectDB();

//Make TCP server
var tcpServer = net.createServer(connectSocket);

//Favicon
app.use('/favicon.ico', express.static('./public/images/favicon.ico'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Encoding
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/i',redirectRoute);
app.use('/api', shortenRouter.router);

app.use((req,res)=>{
    res.status(404).render("Page-Not-Found");
})

tcpServer.listen(9999,'127.0.0.1',()=>{
    console.log("Connected To TCP Server...");
});

module.exports = app;