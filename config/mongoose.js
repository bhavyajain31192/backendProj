/**
 * Created by bhavya on 8/4/16.
 */
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

module.exports = function(){
    var db = mongoose.connect('mongodb://localhost/test');
    require('../dbops/user/user.model');
    require('../dbops/access/access.model');
    require('../dbops/roles/role.model');
    return db;
};