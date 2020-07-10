const mongooes = require('mongoose');

const expositionSchema = new mongooes.Schema({
    // ID_Exposition : mongooes.Schema.Types.ObjectId,
    _id : mongooes.Schema.Types.ObjectId,
    Name : String,
    Date_Create : String, //mongooes.Schema.Types.Date //Need convert string to Date
    Date_Open : String,
    Date_Close : String,
    Image : String
});

module.exports = mongooes.model('Exposition', expositionSchema);