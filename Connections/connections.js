// "C:\Program Files\MongoDB\Server\4.0\bin\mongod.exe" --dbpath="c:\data\db"
const mongoose = require('mongoose')

mongoose.Promise = global.Promise;

module.exports = function(){
        mongoose.connect("mongodb://localhost/Article", {useNewUrlParser: true})
        mongoose.connection.once('open', function(){
            console.log("Connection has been made!!!");
        }).on('error', function(err){
            console.log("Connection error: ", err);
        })    
}();
