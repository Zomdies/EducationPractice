const mongooes = require('mongoose');

const expositionSchema = new mongooes.Schema({
    // ID_Exposition : mongooes.Schema.Types.ObjectId,
    Name : String,
    Date_Create : mongooes.Schema.Types.Date,
    Date_Open : mongooes.Schema.Types.Date,
    Date_Close : mongooes.Schema.Types.Date,
    Image : String
});

module.exports = mongooes.model('Exposition', expositionSchema);