/**
 * Created by bhavya on 8/4/16.
 */
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

module.exports = function(){
    var db = mongoose.connect('mongodb://localhost/user');
    require('../dbops/user/user.model');
    return db;
};