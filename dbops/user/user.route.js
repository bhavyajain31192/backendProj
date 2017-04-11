/**
 * Created by bhavya on 8/4/16.
 */
var userController=require('../../dbops/user/user.controller.js');
var validation =  require('../../dbops/user/user.validation.js');

module.exports = function (app) {

    app.route('/user')
        .get(userController.getUsers)
        .post(validation.validateCreateUser,userController.createUser);

};