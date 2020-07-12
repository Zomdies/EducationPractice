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

const dopFunction = require('../specialFunction');
const Exhibit = require('../models/Exhibit');
const { param } = require('../../App');

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});


module.exports = (access_token) => {

    // GET Exhibit // Need to get all Exhibit or Exhibit by _id
    route.get('/', (req, res, next) => {
        const getOps = {};
        if (req.body["_id"])
            getOps["_id"] = req.body._id;
        Exhibit.find(getOps, null, { skip: req.body.skip, limit: req.body.limit })
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
    route.post('/', upload.single('exhibitImage'), (req, res, next) => {
        if (dopFunction.CheckToken(req.body.token, access_token)) {
            var postOps = {};
            for (param in Exhibit.schema.paths) {

                if (param !== '_id' && param !== '__v' && param !== 'Image')
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
            try {
                postOps["Image"] = req.file.destination + req.file.filename;
            } catch (err) {
                res.status(500).json({
                    message: "You didn't send all parametrs",
                    error: err
                })
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
    route.patch('/', upload.single('exhibitImage'), (req, res, next) => {
        if (dopFunction.CheckToken(req.body.token, access_token)) {
            const updateOps = {};
            for (var param in req.body) {
                if (param !== "_id" && param !== "exhibitImage")
                    updateOps[param] = req.body[param];
            }
            try {
                updateOps["Image"] = req.file.destination + req.file.filename;
            } catch{ };
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