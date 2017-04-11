/**
 * Created by bhavya on 8/19/16.
 */
var messageContoroller=require('../../dbops/message/message.controller');
var validation =  require('../../dbops/message/message.validation');
module.exports = function (app) {

    app.route('/message')
        .post(validation.validateForm,messageContoroller.sendSms)
        .get(messageContoroller.sendHtmlPage);
    app.route('/sms')
        .get(messageContoroller.getSms);
    app.route('/number')
        .get(messageContoroller.getNumbers);
};