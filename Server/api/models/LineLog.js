const mongooes = require('mongoose');

const lineLogSchema = new mongooes.Schema({
    _id : mongooes.Schema.Types.ObjectId,
    Date_Note : Date,
    ID_Exhibit : mongooes.Schema.Types.ObjectId,
    ID_Exposition : mongooes.Schema.Types.ObjectId
});

module.exports = mongooes.model('Linelog', lineLogSchema);