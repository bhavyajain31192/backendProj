/**
 * Created by bhavya on 8/4/16.
 */

var userModel=require('mongoose').model('user');
var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;



/**
 * for creatind some new students in user collection
 * */


var responseMessage = {
    error: {}
};

exports.createUser = function (req,res,next) {

    var user = new userModel(req.body);
    user.save().then(function (results) {

        res.status(200).json(results);

    }).catch(null,function(err){

        responseMessage.error = err;
        res.status(500).json(responseMessage);

    });
};


exports.getUsers = function (req,res,next) {
    userModel.find().then(function(results){
        if(!results){
            res.status(404).json("No student Present");
        }else{
            res.status(200).json(results);
        }
    });
};