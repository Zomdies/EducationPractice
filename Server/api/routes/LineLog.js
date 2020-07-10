const express = require('express');
const route = express.Router();
const mongooes = require('mongoose');

const LineLog = require('../models/LineLog');
const Exhibit = require('../models/Exhibit');
const Exposition = require('../models/Exposition')

// GET LineLog // Need to get all LineLog or LineLog by _id
route.get('/',(req,res,next)=>{
    const getOps = {};
    if (req.body["_id"]) 
        getOps["_id"] = req.body._id;
    LineLog.find(getOps)
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

// POST LineLog // Need to creater LineLog
route.post('/', async (req,res,next) =>{
    var postOps = {};
    for (param in LineLog.schema.paths){
        
        if (param !== '_id' && param !== '__v' && param !== 'Date_Note') //&& param !== 'ID_Exhibit' && param !== 'ID_Exposition'
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
    await Exposition.findOne({ _id : postOps.ID_Exposition})
    .exec()
    .catch(err =>{
        res.status(500).json({
            message : "Error Exposition with ID_Exposition not found",
            error : err
        });
        res.send();
    });
    await Exhibit.findOne({ _id : postOps.ID_Exhibit})
    .exec()
    .catch(err =>{
        res.status(500).json({
            message : "Error Exhibit with ID_Exhibit not found",
            error : err
        });
        res.send();
    });
    postOps["_id"] = new mongooes.Types.ObjectId;
    postOps["Date_Note"] = new Date().toString();
    const lineLog = new LineLog(postOps);
    lineLog.save()
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

// PATH LineLog // Need to update atribute in LineLog
route.patch('/', (req,res,next) =>{
    const updateOps = {};
    for (param in req.body){
        if (param !== "_id")
            updateOps[param] = req.body[param];
    }
    LineLog.updateOne({_id : req.body._id},{ $set: updateOps })
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

// DELETE LineLog // Need to delete LineLog
route.delete('/',(req,res,next)=>{
    LineLog.deleteOne({ _id : req.body._id})
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