/**
 * Created by bhavya on 8/5/16.
 */
var dotenv = require('dotenv').config();
var jwt    = require('jsonwebtoken');
var error = {};
/**
 * all validation goes here
 * */


/**
* validation for create user function
* */
exports.validateCreateUser = function (req,res,next) {
    var errArray=[];
    var err=new Error();
    if(!req.body.name){
        err.name='name is missing';
        errArray.push(err);

    }
    if(errArray.length>0){
        console.log(errArray,"validating errors1");
        next(errArray);

    }else{
        console.log(errArray,"validating errors2");
        next();

    }

};

exports.verifyToken = function(req,res,next){
    var tokenData = jwt.verify(req.query.token, process.env.JWTSIGNATURE);
    console.log("tokenData",tokenData);
    if(tokenData){
        next();
    }
    else{
        err.name='token is invalid';
        next(err);
    }
};