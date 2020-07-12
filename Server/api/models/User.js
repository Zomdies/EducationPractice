const mongooes = require('mongoose');

const userSchema = new mongooes.Schema({
    // ID_User : mongooes.Schema.Types.ObjectId,
    Login : {
        type: String,
        required: true,
        unique : true
    },
    Password : {type : String, required: true}, 
    Hash : {type : String, required: true} //Type of hash
});

module.exports = mongooes.model('User', userSchema);