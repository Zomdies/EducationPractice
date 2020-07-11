const mongooes = require('mongoose');

const exhibitSchema = new mongooes.Schema({
    // ID_Exhibit : mongooes.Schema.Types.ObjectId,
    Name: String,
    Age: Number,
    Description: String,
    Image: String
});

module.exports = mongooes.model('Exhibit', exhibitSchema);