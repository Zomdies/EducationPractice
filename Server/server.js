const app = require('./App')


const port = process.env.PORT || 8000;


app.listen(port, () => {
    console.log('We are live on ' + port);
});  





