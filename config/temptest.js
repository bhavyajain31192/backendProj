/**
 * Created by bhavya on 4/11/17.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/addressbookdb');
var express = require('express');
var app = express();
var db = mongoose.connection;

app.use(express.static(__dirname + '/../client'));

app.post("/",function(req,res){
    res.end("Registration Succesfully Completed!");

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function (callback) {
        console.log("connected.")
    });

    // Schema
    var RegSchema = mongoose.Schema({
        Name: String,
        Email: String,
        Pass: String,
        Num: Number,
        reg_time : {
            type : Date, default: Date.now
        }
    }, { collection: 'AddressCol' });

    // Model
    var UserReg = mongoose.model('UserReg', RegSchema);

    // Add in collection
    var UserAdd = new UserReg({
        Name: req.body.name,
        Email: req.body.email,
        Pass: req.body.pass,
        Num: req.body.num,
    });

    // Save
    UserAdd.save(function (err, fluffy) {
        if (err) return console.error(err);
    });
});

app.listen(8000, function() {
    console.log("Server is running!");
});