const cryptoJS = require('crypto-js');
const mongooes = require('mongoose');

const autoLogout = 25;
const dopFunction = require('../specialFunction');
const User = require('../models/User');

module.exports = (app, access_token) =>{
    app.post('/login', (req,res,next) =>{
        const postOps = {
            Login : req.body.Login,
            Password : req.body.Password
        };
        User.findOne({Login: postOps.Login})
        .then(result =>{
            var text = postOps.Login+postOps.Password+result.Hash;
            const hash = cryptoJS.MD5(text).toString();
            if (hash === result.Password){
                const token = dopFunction.GenerateSolid(50);
                access_token[postOps.Login] = token;
                setTimeout(()=>{
                    delete access_token[postOps.Login]
                },autoLogout*1000);
                res.status(200).json({
                    message : `User ${postOps.Login} was logged`,
                    token : token
                });
            }else{
                res.status(500).json({
                    message : "Error password uncorrect"
                });
            };
        })
        .catch(err =>{
            console.log(err);
            res.status(404).json({
                message : `Error User with Login : ${postOps.Login} not found`,
                error : err
            });
        });
    });
    app.post('/logout', (req,res,next)=>{
        const postOps = {
            Login : req.body.Login,
        };
        try{
            delete access_token[postOps.Login]
            if (access_token[postOps.Login] === undefined){
                res.status(500).json({
                    message : `User ${postOps.Login} logout`
                });
            }else{
                throw "Error user didn't logout"
            }
        }catch(err){
            console.log(err);
            res.status(500).json({
                message : "Error user didn't logout",
                error : err
            });
        };
        
        
    });
};