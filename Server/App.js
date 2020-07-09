const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser')

const config = require('./config/db_const');

const app = express();
mongoose.connect(config.url,{ useUnifiedTopology: true,  useNewUrlParser: true });

const floorRoutes = require('./api/routes/Floor');
const hallRoutes = require('./api/routes/Hall');
const exhibitRoutes = require('./api/routes/Exhibit');
const expositionRoutes = require('./api/routes/Exposotion');
const lineLogRoutes = require('./api/routes/LineLog');
const userRoutes = require('./api/routes/User');

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use('/floor', floorRoutes);
app.use('/hall', hallRoutes);
app.use('/exhibit', exhibitRoutes);
app.use('/exposition', expositionRoutes);
app.use('/user', userRoutes);
app.use('/linelog', lineLogRoutes);

module.exports = app;