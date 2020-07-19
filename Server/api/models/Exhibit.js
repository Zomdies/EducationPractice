const mongooes = require('mongoose');

const exhibitSchema = new mongooes.Schema({
    // ID_Exhibit : mongooes.Schema.Types.ObjectId,
    Name: { type: String, required: true },
    Age: { type: Number, required: true },
    Description: { type: String, required: true },
    Image: { type: String, required: true },
    Exposition: {
        Date_Note : { type : Date, default : null},
        ID_Exposition: {
            type: mongooes.Schema.Types.ObjectId,
            default: null,
            ref: "Exposition"
        }
    }
});

module.exports = mongooes.model('Exhibit', exhibitSchema);