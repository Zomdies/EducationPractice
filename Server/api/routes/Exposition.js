const express = require('express');
const route = express.Router();
const mongooes = require('mongoose');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});


const dopFunction = require('../specialFunction');
const LineLog = require('../models/LineLog');
const Exhibit = require('../models/Exhibit');
const Exposition = require('../models/Exposition')

module.exports = (access_token) => {
    // GET Exposition // Need to get all Exposition or Exposition by _id
    route.get('/', (req, res, next) => {
        const getOps = {};
        if (req.body["_id"])
            getOps["_id"] = req.body._id;
        Exposition.find(getOps, null, { skip: req.body.skip, limit: req.body.limit })
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

    // GET Exhibit in Exposition // Need to get all Exhibit in Exposition
    route.get('/:id', async (req, res, next) => {
        const getOps = {};
        if (req.body["_id"])
            getOps["_id"] = req.body._id;
        var result = [];
        await LineLog.find({ ID_Exposition: req.params.id })
            .then(async (items) => {
                for (var i = 0; i < items.length; i++) {
                    await Exhibit.find({ "_id": items[i].ID_Exhibit })
                        .then(exp => {
                            console.log(exp);
                            result.push(exp);
                        })
                }
            })
            .catch(err => {
                res.status(404).json({
                    message: `Error exposition`,
                    error: err
                })
            });
        res.status(200).send(result);
    });

    // POST Exposition // Need to creater Exposition
    route.post('/', upload.single("expositionImage"), (req, res, next) => {
        if (dopFunction.CheckToken(req.body.token, access_token)) {
            var postOps = {};
            for (param in Exposition.schema.paths) {
                if (param !== '_id' && param !== '__v' && param !== "Image" && param != "Date_Create")
                    if (req.body[param] !== undefined) {
                        postOps[param] = req.body[param];
                    } else {
                        console.log("1)")
                        res.status(500).json({
                            error: "You didn't send all parametrs"
                        });
                        res.send();
                        break;
                    };
            };
            try {
                postOps["Image"] = req.file.destination + req.file.filename;
            } catch (err) {
                res.status(500).json({
                    message: "You didn't send all parametrs",
                    error: err
                })
            };
            postOps["_id"] = new mongooes.Types.ObjectId;
            postOps["Date_Create"] = new Date().toString();
            console.log(postOps);
            const exposition = new Exposition(postOps);
            exposition.save()
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

    // PATH Exposition // Need to update atribute in Exposition
    route.patch('/', upload.single("expositionImage"), (req, res, next) => {
        if (dopFunction.CheckToken(req.body.token, access_token)) {
            const updateOps = {};
            for (param in req.body) {
                if (param !== "_id" && param !== "expositionImage")
                    updateOps[param] = req.body[param];
            }
            try {
                updateOps["Image"] = req.file.destination + req.file.filename;
            } catch{ };
            Exposition.findOneAndUpdate({ _id: req.body._id }, { $set: updateOps },{ new: true }) 
                .exec()
                .then(result => {
                    if (result["n"] === 0) {
                        res.status(404).json({  //Don't work because need return new object => i use findOneAndUpdate. If use updateOne, it will work.
                            message: "Error object with ID didn't found",
                        });
                    } else {
                        Exposition.find({})
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

    // DELETE Exposition // Need to delete Exposition
    route.delete('/', (req, res, next) => {
        if (dopFunction.CheckToken(req.body.token, access_token)) {
            Exposition.deleteOne({ _id: req.body._id })
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