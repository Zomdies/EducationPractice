const mongooes = require('mongoose');

const exhibitSchema = new mongooes.Schema({
    // ID_Exhibit : mongooes.Schema.Types.ObjectId,
    Name: {type : String, required: true},
    Age: {type : Number, required: true},
    Description: {type : String, required: true},
    Image: {type : String, required: true}
});

module.exports = mongooes.model('Exhibit', exhibitSchema);