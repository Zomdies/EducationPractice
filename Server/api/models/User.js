const mongooes = require('mongoose');

const userSchema = new mongooes.Schema({
    // ID_User : mongooes.Schema.Types.ObjectId,
    Login : String,
    Password : String, // md5
    Hash : String //Type of hash
});

module.exports = mongooes.model('Linelog', lineLogSchema);