const express = require('express');
const route = express.Router();
const mongooes = require('mongoose');

const Floor = require('../models/Floor');

// GET Floor // Need to get information about floor
route.get('/',(req,res,next)=>{
    const getOps = {};
    if (req.body["_id"]) 
        getOps["_id"] = req.body._id;
    Floor.find(getOps)
    .then(result =>{
        res.status(200).json({
            result : result
        })
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        })
    });
})

// POST Floor // Need to creater Floor
route.post('/', (req,res,next) =>{

    if (!req.body.Name) res.status(500).json({ error : "Parametr Name is null"});
    const floor = new Floor({
        ID_Floor : new mongooes.Types.ObjectId,
        Name : req.body.Name
    });
    floor.save()
    .then(result =>{
        res.status(200).json({
            message : 'Object created',
            result : result
        })
    })
    .catch(err =>{
        res.status(500).json({
            message : "Object didn't create",
            error : err
        })
    });

})

// PATH Floor // Need to update Floor
route.patch('/', (req,res,next) =>{
    const updateOps = {
        Name : req.body.Name
    };
    Floor.updateOne({_id : req.body._id},{ $set: updateOps })
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

// DELETE Floor // Need to delete Floor
route.delete('/',(req,res,next)=>{
    Floor.deleteOne({ _id : req.body._id})
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