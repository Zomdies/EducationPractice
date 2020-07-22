const mongooes = require('mongoose');

const expositionSchema = new mongooes.Schema({
    // ID_Exposition : mongooes.Schema.Types.ObjectId,
    _id: mongooes.Schema.Types.ObjectId,
    Name: {type : String, required: true},
    Status: {type : String, required: true}, 
    Date_Create: {type : Date, required: true}, //mongooes.Schema.Types.Date //Need convert string to Date
    Date_Open: {type : Date, required: true},
    Date_Close: {type : Date, required: true},
    Image: {type : String, required: true},
    Hall:
    {
        ID_Hall: {
            type: mongooes.Schema.Types.ObjectId,
            default: null,
            ref: "Hall"
        }
    }
});

module.exports = mongooes.model('Exposition', expositionSchema);