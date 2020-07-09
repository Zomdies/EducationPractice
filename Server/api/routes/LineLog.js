const express = require('express');
const route = express.Router();

route.get('/',(req,res,next)=>{
    res.status(200).json({
        message : "It's LineLog"
    })
})


module.exports = route;