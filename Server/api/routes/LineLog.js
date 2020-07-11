const express = require('express');
const route = express.Router();
const mongooes = require('mongoose');

const dopFunction = require('../specialFunction');
const LineLog = require('../models/LineLog');
const Exhibit = require('../models/Exhibit');
const Exposition = require('../models/Exposition')


module.exports = (access_token) => {
    // GET LineLog // Need to get all LineLog or LineLog by _id
    route.get('/', (req, res, next) => {
        const getOps = {};
        if (req.body["_id"])
            getOps["_id"] = req.body._id;
        LineLog.find(getOps)
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

    // POST LineLog // Need to creater LineLog
    route.post('/', async (req, res, next) => {
        if (dopFunction.CheckToken(req.body.token, access_token)) {
            var postOps = {};
            for (param in LineLog.schema.paths) {

                if (param !== '_id' && param !== '__v' && param !== 'Date_Note')
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
            let expos = null;
            let exhib1 = null;
            let exhib = null;
            try {
                expos = await Exposition.findOne({ _id: postOps.ID_Exposition });
                exhib = await Exhibit.findOne({ _id: postOps.ID_Exhibit });
                exhib1 = await LineLog.findOne({ ID_Exhibit: postOps.ID_Exhibit });
            } catch (err) {
                res.status(500).json({
                    message: "Error Object with ID_Exposition or ID_Exhibit not found",
                    error: err
                })
            };
            if (exhib1 !== null) {
                res.status(500).json({
                    message: "Error Object with ID_Exhibit already exist"
                });
            } else {
                if (expos === null || exhib === null) {
                    res.status(500).json({
                        message: "Error Object with ID_Exposition or ID_Exhibit not found"
                    });
                } else {
                    postOps["_id"] = new mongooes.Types.ObjectId;
                    postOps["Date_Note"] = new Date().toString();
                    const lineLog = new LineLog(postOps);
                    lineLog.save()
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
                }
            };
        } else {
            res.status(500).json({
                message: "Error bad token"
            });
        };
    });

    // PATH LineLog // Need to update atribute in LineLog
    route.patch('/', async (req, res, next) => {
        if (dopFunction.CheckToken(req.body.token, access_token)) {
            const updateOps = {};
            for (param in req.body) {
                if (param !== "_id")
                    updateOps[param] = req.body[param];
            }
            let expos = null;
            let exhib = null;
            let exhib1 = null;
            try {
                expos = await Exposition.findOne({ _id: updateOps.ID_Exposition });
                exhib = await Exhibit.findOne({ _id: updateOps.ID_Exhibit });
                exhib1 = await LineLog.findOne({ ID_Exhibit: updateOps.ID_Exhibit });
            } catch (err) {
                console.log("1");
                res.status(500).json({
                    message: "Error Object with ID_Exposition or ID_Exhibit not found",
                    error: err
                })
            };
            if (exhib1 !== null) {
                res.status(500).json({
                    message: "Error Object with ID_Exhibit already exist"
                });
            } else {
                if (expos === null || exhib === null) {
                    res.status(500).json({
                        message: "Error Object with ID_Exposition or ID_Exhibit not found"
                    });
                } else {
                    updateOps["Date_Note"] = new Date();
                    LineLog.updateOne({ _id: req.body._id }, { $set: updateOps })
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
                };
            };
        } else {
            res.status(500).json({
                message: "Error bad token"
            });
        };
    });

    // DELETE LineLog // Need to delete LineLog
    route.delete('/', (req, res, next) => {
        if (dopFunction.CheckToken(req.body.token, access_token)) {
            LineLog.deleteOne({ _id: req.body._id })
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
    })

    return route;
};