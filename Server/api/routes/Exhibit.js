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
const LineLog = require('../models/LineLog')

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

    // GET EXHIBIT/:id // Need to get Exhibi, which we can put in Exposition
    route.get('/:id', (req, res, next) => {
        Exhibit.find({})
            .then(exhibits => {
                let a = [];
                // || exhibit.Exposition.ID_Exposition == req.params.id
                exhibits.map(exhibit => {
                    if (exhibit.Exposition.ID_Exposition === null) {
                        a.push(exhibit)
                    }
                })
                res.send(a);
            })
            .catch(err => console.log(err));
    });

    // POST Exhibit/AddInExposition  //Need to add Exposition to Exhibit

    route.post('/AddInExposition', (req, res, next) => {

        try {
            req.body.put.map(id => {
                let updateOps = {
                    Exposition: {
                        ID_Exposition: req.body.ID_Exposition,
                        Date_Note: Date.now()
                    }
                }
                Exhibit.findOneAndUpdate({ _id: id }, { $set : updateOps}, (err, doc) => {
                    if (err) { res.send(err); }
                    res.send(doc);
                })
            })

        } catch (err) { res.send("Error Server") }
        // if (typeof req.body.put)


    });


    // POST Exhibit // Need to creater Exhibit
    route.post('/', upload.single('exhibitImage'), (req, res, next) => {
        if (dopFunction.CheckToken(req.body.token, access_token)) {
            var postOps = {};
            for (var param in Exhibit.schema.paths) {

                if (param !== '_id' && param !== '__v' && param !== 'Image' && param !== 'Exposition.Date_Note' && param !== 'Exposition.ID_Exposition')
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
                if (param !== "_id" && param !== "exhibitImage" && param !== 'ID_Exposition')
                    updateOps[param] = req.body[param];
            }
            try {
                updateOps["Image"] = req.file.destination + req.file.filename;
            } catch{ };
            try {
                updateOps["Exposition"] = {
                    ID_Exposition: req.body.ID_Exposition,
                    Date_Note: Date.now()
                }
                // updateOps.Exposition.Date_Note = Date.now();
            } catch{ };
            console.log(updateOps);
            Exhibit.findOneAndUpdate({ _id: req.body._id }, { $set: updateOps }, { new: true })
                .exec()
                .then(result => {
                    if (result["n"] === 0) {
                        res.status(404).json({
                            message: "Error object with ID didn't found", //Don't work because need return new object => i use findOneAndUpdate. If use updateOne, it will work.
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