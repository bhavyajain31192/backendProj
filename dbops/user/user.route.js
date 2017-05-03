/**
 * Created by bhavya on 8/4/16.
 */
var userController=require('../../dbops/user/user.controller.js');
var validation =  require('../../dbops/user/user.validation.js');

module.exports = function (app) {

    app.route('/user')
        .get(userController.getUsers)
        .post(userController.createUser);
    app.route('/login')
        .post(userController.login);
    app.route('/authorise')
        .post(userController.authorize);

};