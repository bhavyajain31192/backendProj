/**
 * Created by bhavya on 8/19/16.
 */
var twilio_account_sid = 'AC5b11d2ef8b7fe3352adb1542c20ed8c7';
var twilio_auth_token  = '9011bb3615811b7b0a27aad136fa9d5b';
var client = require('twilio')(twilio_account_sid, twilio_auth_token);
var messageModel=require('mongoose').model('message');
var mongoose = require('mongoose');

mongoose.Promise = require('q').Promise;
exports.sendHtmlPage = function (req,res,next) {
    //res.sendFile( __dirname + "/" + "message.html" );
    res.status(200).send("Welcome Onboared");
};

exports.sendSms = function (req,res,next) {
    client.sendMessage({
        from: req.body.from_number,
        to: req.body.to_number,
        body: req.body.message
    }, function(err,data) {
        if (!err) {
            var message=new messageModel(req.body);
            message.save().then(function (results) {
                console.log("success",results);

            }).catch(null,function(err){
                console.log("err",err);
            });
                res.send("Message send successfully");

        } else {
            var message=new messageModel(req.body);
            message.save().then(function (results) {
                console.log("success",results);

            }).catch(null,function(err){
                console.log("err",err);
            });
            console.log("err",err);
            res.send("Something went wrong");
        }
    });
    console.log("message");
};

// exports.getSms = function (req,res,next) {
//
//     messageModel.find({}).then(function(data){
//         res.status(200).send(data);
//     }).then(null,function (err) {
//         res.status(500).send("ERROR");
//     });
//
// };
exports.getSms = function (req,res,next) {
    console.log("number",req.query.number);
    client.messages.list(function(err, data) {
        var result=[];
        data.messages.forEach(function(message) {
            if(+message.from == req.query.number){
                result.push({"from_number":message.from,"to_number":message.to,"message":message.body});
            }

        });
        res.status(200).send(result);
    });



};
exports.getNumbers = function (req,res,next) {
    client.incomingPhoneNumbers.list(function(err, data) {
        var result=[];
        data.incomingPhoneNumbers.forEach(function(number) {
            result.push({"from_number":number.phoneNumber});
        });
        //console.log(result);
        res.status(200).send(result);
    });
};