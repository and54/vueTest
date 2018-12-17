const express = require('express');
const router = express.Router();

router.post('/login', (req, res, next) => {
    if (req.body.user && req.body.password){
        if(req.body.user=='aaa@aaa.aaa' && req.body.password=='Abc123') {
            const data = req.body.user + ':' + req.body.password;  
            const buff = new Buffer(data);  
            const base64data = buff.toString('base64');
            res.status(200).json({
                token: base64data,
                success: true,
                message: 'user logued in'
            });
        } else {
            res.status(401).json({
                success: false,
                message: 'unauthorized'
            });
        }        
    } else {
        res.status(400).json({
            success: false,
            message: 'bad request'
        });
    }
});

module.exports = router;