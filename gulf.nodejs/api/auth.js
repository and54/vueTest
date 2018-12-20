const express = require('express');
const router = express.Router();
const dbCalls = require('./../mongodb');

router.post('/login', (req, res, next) => {
    if (req.body.user && req.body.password) {
        dbCalls.Login({
            user: req.body.user,
            password: req.body.password
        }, (err, data) => {
            console.log(err, data)
            if (err || !data) {
                res.status(401).json({
                    success: false,
                    message: 'unauthorized'
                });
            } else {
                const base64data = Buffer.from(data.user + ':' + data.password).toString('base64');
                data.password = null;
                res.status(200).json({
                    token: base64data,
                    success: true,
                    message: 'user logued in',
                    user: data
                });
            }
        });
    } else {
        res.status(400).json({
            success: false,
            message: 'bad request'
        });
    }
});

router.post('/register', (req, res, next) => {
    if (req.body.user && req.body.password) {
        dbCalls.InsertField('users', req.body, (err, data) => {
            console.log(err, data)
            if (err || !data) {
                res.status(401).json({
                    success: false,
                    message: 'unauthorized'
                });
            } else {
                req.body.password = null;
                res.status(200).json({
                    success: true,
                    message: 'user registered',
                    user: req.body
                });
            }
        });
    } else {
        res.status(400).json({
            success: false,
            message: 'bad request'
        });
    }
});

router.get('/contactinfo/:user', (req, res, next) => {
    if (req.params.user) {
        dbCalls.CheckUser({
            user: req.params.user
        }, (err, data) => {
            console.log(err, data)
            if (err || !data) {
                res.status(401).json({
                    success: false,
                    message: 'error'
                });
            } else {
                res.status(200).json({
                    success: true,
                    message: 'user info',
                    info: {
                        emails: data.emails,
                        phones: data.phones
                    }
                });
            }
        });
    } else {
        res.status(400).json({
            success: false,
            message: 'bad request'
        });
    }
});

router.get('/checkuser/:user', (req, res, next) => {
    if (req.params.user) {
        dbCalls.CheckUser({
            user: req.params.user
        }, (err, data) => {
            console.log(err, data)
            if (err) {
                res.status(401).json({
                    success: false,
                    message: 'error'
                });
            } else {
                res.status(200).json({
                    success: true,
                    message: 'user checked',
                    exists: Boolean(data)
                });
            }
        });
    } else {
        res.status(400).json({
            success: false,
            message: 'bad request'
        });
    }
});

module.exports = router;