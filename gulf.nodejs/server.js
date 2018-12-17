//import express from 'express';
// import bodyParser  from 'body-parser';
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');

const auth = require('./api/auth');

const app = express();
const port = process.env.PORT || 4300;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/auth', auth);

app.use((req, res, next)=> {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 501);
    res.json({
        error: {
            code: err.status || 501,
            message: err.message
        }
    });
 });

 const server = http.createServer(app);
 server.listen(port);
