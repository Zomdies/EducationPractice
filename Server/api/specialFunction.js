module.exports = {
    GenerateSolid(lenght = 30) {
        var hash = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ012346789";
        var random = '';
        for(var i = 0; i < lenght; i++){
            random += hash[parseInt(Math.random()*hash.length)];
        };
        return random;
    },
    CheckToken(token, access_token) {
        let tokens = Object.values(access_token);
        if (tokens.includes(token)){
            return true;
        }else{
            return false;
        };
    }
};