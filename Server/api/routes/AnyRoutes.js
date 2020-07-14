const express = require('express');
const cryptoJS = require('crypto-js')
const route = express.Router();

const mongooes = require('mongoose');

const dopFunction = require('../specialFunction');
const User = require('../models/User');


module.exports = (access_token) =>{

    route.post('/tokenLive', (req,res,next)=>{
        let check = Object.values(access_token).indexOf(req.body.token,0);
        console.log(check);
        if (check !== 1){
            res.status(500).json({
                message : "Token is active",
            })
        }else{
            res.status(404).json({
                message : "Error token not found",
            })
        }
    });

    return route;
};