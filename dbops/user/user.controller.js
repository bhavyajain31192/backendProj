/**
 * Created by bhavya on 8/4/16.
 */

var userModel= require('mongoose').model('user');
var accessModel=require('mongoose').model('access');
var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
var jwt    = require('jsonwebtoken');
var dotenv = require('dotenv').config();


/**
 * for creatind some new students in user collection
 * */


var responseMessage = {
    error: {}
};

exports.createUser = function (req,res,next) { 
    var user = new userModel(req.body);
    userModel.findOne({ num: req.body.num }, function(err,userDetails){
        if(!userDetails){
            user.save(function (err, results) {
                if(err) {
                    next({Error : err});
                    return;
                }
                var tokenData = jwt.sign({uid: results._id}, process.env.JWTSIGNATURE,  { expiresIn: '60 days' });
                var access = new accessModel({token: tokenData,num: req.body.num});
                access.save(function(err, accessRes){
                    res.status(200).json({accessRes});
                });    
            });
        }
        else{
            next({Error : "Duplicate Mobile Number"});
        }
    })
};

exports.login = function (req,res,next) { 
    userModel.findOne({num: req.body.num, pass: req.body.pass}).then(function(results){
        if(!results){
            res.status(404).json({success:false}); 
        }else{
            res.status(200).json(results); 
        }
    }).catch(function(err){
        res.status(400).json(err); 
    })
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

exports.authorize = function(req, res) {

    // find the user
    userModel.findOne({
        name: req.body.name
    }, function(err, user) {

        if (err) throw err;

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {

            // check if password matches
            if (user.password != req.body.password) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {
                console.log("fhjdh",process.env.JWTSIGNATURE);
                // if user is found and password is right
                // create a token
                var token =  jwt.sign(user, process.env.JWTSIGNATURE, { expiresIn: '60 days' }) ;


                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }

        }

    });
};