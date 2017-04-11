/**
 * Created by bhavya on 8/4/16.
 */
var express = require('./config/express');
var mongoose = require('./config/mongoose');

var db = mongoose();
var app = express();
/**
 * error handling
 * */
// app.get('/message.htm', function (req, res) {
//     res.sendFile( __dirname + "/dbops/message/" + "message.html" );
// });


app.use(function(err, req, res, next) {

    console.error(err,"errr");
    res.status(500).send(err);

});

app.listen(3003);
console.log("SERVER STARTED");


module.exports =app;