const mongooes = require('mongoose');

const hallSchema = new mongooes.Schema({
    // ID_Hall : mongooes.Schema.Types.ObjectId,
    Square: {type : Number, required: true},
    Name: {type : String, required: true}
});

module.exports = mongooes.model('Hall', hallSchema);