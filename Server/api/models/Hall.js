const mongooes = require('mongoose');

const hallSchema = new mongooes.Schema({
    // ID_Hall : mongooes.Schema.Types.ObjectId,
    Square: {type : Number, required: true},
    Name: {type : String, required: true},
    Floor: {
        ID_Floor:{
            type: mongooes.Schema.Types.ObjectId,
            default: null,
            ref: "Floor"
        }
    }
});

module.exports = mongooes.model('Hall', hallSchema);