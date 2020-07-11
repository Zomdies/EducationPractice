const mongooes = require('mongoose');

const hallSchema = new mongooes.Schema({
    // ID_Hall : mongooes.Schema.Types.ObjectId,
    Square: Number,
    Name: String
});

module.exports = mongooes.model('Hall', hallSchema);