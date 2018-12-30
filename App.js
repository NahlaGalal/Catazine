const express = require('express');
const app = express();
const connection = require('./Connections/connections');
const userController = require('./Controllers/UserControllers')

connection;
userController(app);

app.set('view engine', 'ejs');

app.use('/Assets', express.static('./Assets'));
app.use('/Css', express.static('./Css'))
app.use('/Images', express.static('./Images'))
app.use('/webfonts', express.static('./webfonts'))

app.listen('3000', function(err){
    if(err) console.log(err);
})
