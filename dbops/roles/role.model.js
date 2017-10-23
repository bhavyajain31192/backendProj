/**
 * Created by bhavya on 8/4/16.
 */


var mongoose = require('mongoose'),
    schema = mongoose.Schema;

require('mongoose-assert')(mongoose);

var RolesSchema = new schema({
    name: { type: String },
    permissions: { type: Array },
    status: { type: String},
    createdAt : {
        type : Date, default: Date.now
    },
}, { collection: 'role' });

RolesSchema.on('error',function(err,data){
    next(err);
    return;
})
mongoose.model('role', RolesSchema);