/**
 * Created by bhavya on 8/4/16.
 */


var mongoose = require('mongoose'),
    schema = mongoose.Schema;

require('mongoose-assert')(mongoose);

var RegSchema = new schema({
    name: { type: String },
    email: { type: String },
    pass: { type: String, required: true },
    num: { type: String, match: [/^[0-9]{10}$/, "Mobile number must be 10 digit"], required: true, unique: true, sparse: true },
    reg_time : {
        type : Date, default: Date.now
    },
    roles: {type: Array},
}, { collection: 'user' });

RegSchema.on('error',function(err,data){
    next(err);
    return;
})
mongoose.model('user', RegSchema);