const express = require('express');
const route = express.Router();
const mongooes = require('mongoose');

const dopFunction = require('../specialFunction');
const Exhibit = require('../models/Exhibit');



module.exports = (access_token) => {

    // GET Exhibit // Need to get all Exhibit or Exhibit by _id
    route.get('/', (req, res, next) => {
        const getOps = {};
        if (req.body["_id"])
            getOps["_id"] = req.body._id;
        Exhibit.find(getOps)
            .then(result => {
                res.status(200).json({
                    result: result
                })
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            });
    });

    // POST Exhibit // Need to creater Exhibit
    route.post('/', (req, res, next) => {
        if (dopFunction.CheckToken(req.body.token, access_token)) {
            var postOps = {};
            for (param in Exhibit.schema.paths) {

                if (param !== '_id' && param !== '__v')
                    if (req.body[param] !== undefined) {
                        postOps[param] = req.body[param];
                    } else {
                        res.status(500).json({
                            error: "You didn't send all parametrs"
                        });
                        res.send();
                        break;
                    };
            };
            postOps["_id"] = new mongooes.Types.ObjectId;
            const exhibit = new Exhibit(postOps);
            exhibit.save()
                .then(result => {
                    res.status(200).json({
                        message: 'Object created',
                        result: result
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        message: "Object didn't create",
                        error: err
                    });
                });
        } else {
            res.status(500).json({
                message: "Error bad token"
            });
        };
    });

    // PATH Exhibit // Need to update atribute in Exhibit
    route.patch('/', (req, res, next) => {
        if (dopFunction.CheckToken(req.body.token, access_token)) {
            const updateOps = {};
            for (param in req.body) {
                if (param !== "_id")
                    updateOps[param] = req.body[param];
            }
            console.log(updateOps);
            Exhibit.updateOne({ _id: req.body._id }, { $set: updateOps })
                .exec()
                .then(result => {
                    if (result["n"] === 0) {
                        res.status(404).json({
                            message: "Error object with ID didn't found",
                        });
                    } else {
                        res.status(200).json({
                            message: "Object has been updated",
                            result: result
                        });
                    }

                })
                .catch(err => {
                    res.status(500).json({
                        message: "Error object hasn't been update",
                        error: err
                    });
                });
        } else {
            res.status(500).json({
                message: "Error bad token"
            });
        };
    });

    // DELETE Exhibit // Need to delete Exhibit
    route.delete('/', (req, res, next) => {
        if (dopFunction.CheckToken(req.body.token, access_token)) {
            Exhibit.deleteOne({ _id: req.body._id })
                .exec()
                .then(result => {
                    if (result["n"] === 0) {
                        res.status(404).json({
                            message: "Error object with ID didn't found",
                        });
                    } else {
                        res.status(200).json({
                            message: "Object has been deleted",
                            result: result
                        });
                    }
                })
                .catch(err => {
                    res.status(500).json({
                        message: "Error object hasn't been deleted",
                        error: err
                    });
                });
        } else {
            res.status(500).json({
                message: "Error bad token"
            });
        };
    });
    return route;
};