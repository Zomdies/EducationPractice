const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser')

const config = require('./config/db_const');

const app = express();
mongoose.connect(config.url, { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const floorRoutes = require('./api/routes/Floor');
const hallRoutes = require('./api/routes/Hall');
const exhibitRoutes = require('./api/routes/Exhibit');
const expositionRoutes = require('./api/routes/Exposition');
const lineLogRoutes = require('./api/routes/LineLog');
const userRoutes = require('./api/routes/User');
const anyRoutes = require('./api/routes/AnyRoutes');


var access_token = {};
access_token["Admin"] = config.test_admin_token;

if (config.show_tokens_to_console) {
    setInterval(() => {
        console.log(access_token);
    }, 1000)
}


app.use(cors());
// app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

require('./api/routes/LoginRoutes')(app, access_token);
app.use('/floor', floorRoutes(access_token));
app.use('/hall', hallRoutes(access_token));
app.use('/exhibit', exhibitRoutes(access_token));
app.use('/exposition', expositionRoutes(access_token));
app.use('/user', userRoutes(access_token));
app.use('/linelog', lineLogRoutes(access_token));
app.use('/', anyRoutes(access_token));

module.exports = app;