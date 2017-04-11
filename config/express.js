/**
 * Created by bhavya on 8/4/16.
 */
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');

module.exports = function(){
    var app = express();
    app.use(express.static(__dirname + "/public"));
    app.use(bodyParser.urlencoded({strict: false, extended: true}));
    app.use(bodyParser.json());
    app.use(morgan('dev'));

    app.all("*", function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
        return next();
    });

    app.get('/', function (req, res) {
        res.status(200).send("Welcome");
    });
    var router = express.Router();

    require('../dbops/user/user.route')(router);
    app.use(router);
    return app;
};