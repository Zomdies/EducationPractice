const mongooes = require('mongoose');

const userSchema = new mongooes.Schema({
    // ID_User : mongooes.Schema.Types.ObjectId,
    Login : {
        type: String,
        unique : true
    },
    Password : String, 
    Hash : String //Type of hash
});

module.exports = mongooes.model('User', userSchema);