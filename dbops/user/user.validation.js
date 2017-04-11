/**
 * Created by bhavya on 8/5/16.
 */

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

