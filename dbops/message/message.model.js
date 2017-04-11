/**
 * Created by bhavya on 9/8/16.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

require('mongoose-assert')(mongoose);
var messageSchema = new Schema( {
    from_number: {type:String},
    to_number: {type:String},
    message: String
});

mongoose.model('message', messageSchema);