const mongoose = require('mongoose');

const floorSchema = new mongoose.Schema({
    // ID_Floor : mongoose.Schema.Types.ObjectId,
    Name : {type : String, required: true}
});

module.exports = mongoose.model('Floor',floorSchema);