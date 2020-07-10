const express = require('express');
const route = express.Router();
const mongooes = require('mongoose');

const Hall = require('../models/Hall');

// GET Hall // Need to get all Hall or Hall by _id
route.get('/',(req,res,next)=>{
    const getOps = {};
    if (req.body["_id"]) 
        getOps["_id"] = req.body._id;
    Hall.find(getOps)
    .then(result =>{
        res.status(200).json({
            result : result
        })
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        });
    });
});

// POST Hall // Need to creater Hall
route.post('/', (req,res,next) =>{
    var postOps = {};
    for (param in Hall.schema.paths){
        
        if (param !== '_id' && param !== '__v')
        if (req.body[param] !== undefined){
            postOps[param] = req.body[param];
        }else{
            res.status(500).json({
                error : "You didn't send all parametrs"
            });
            res.send();
            break;
        };
    };
    postOps["_id"] = new mongooes.Types.ObjectId;
    const hall = new Hall(postOps);
    hall.save()
    .then(result =>{
        res.status(200).json({
            message : 'Object created',
            result : result
        });
    })
    .catch(err =>{
        res.status(500).json({
            message : "Object didn't create",
            error : err
        });
    });
});

// PATH Hall // Need to update atribute in Hall
route.patch('/', (req,res,next) =>{
    const updateOps = {};
    for (param in req.body){
        if (param !== "_id")
            updateOps[param] = req.body[param];
    }
    Hall.updateOne({_id : req.body._id},{ $set: updateOps })
    .exec()
    .then(result =>{
            if (result["n"] === 0){
                res.status(404).json({
                    message : "Error object with ID didn't found",
                });
            }else{
                res.status(200).json({
                    message : "Object has been updated",
                    result : result
                });
            }
            
        })
    .catch(err =>{
            res.status(500).json({
                message : "Error object hasn't been update",
                error : err
            });
        });
});

// DELETE Hall // Need to delete Hall
route.delete('/',(req,res,next)=>{
    Hall.deleteOne({ _id : req.body._id})
    .exec()
    .then(result =>{
        if (result["n"] === 0){
            res.status(404).json({
                message : "Error object with ID didn't found",
            });
        }else{
            res.status(200).json({
                message : "Object has been deleted",
                result : result
            });
        }
    })
    .catch(err =>{
        res.status(500).json({
            message : "Error object hasn't been deleted",
            error : err
        });
    });

})

module.exports = route;