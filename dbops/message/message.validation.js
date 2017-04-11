/**
 * Created by bhavya on 8/19/16.
 */

exports.validateForm = function (req,res,next) {
    var errArray=[];
    var err=new Error();
    if((!req.body.from_number) || isNaN(req.body.from_number)){
        err.name='From number is Invalid';
        errArray.push(err);

    }else if (!req.body.to_number || isNaN(req.body.to_number)){
        err.name='To number is Invalid';
        errArray.push(err);
    }else if(!req.body.message){
        err.name='Message field is missing';
        errArray.push(err);
    }
    if(errArray.length>0){
        console.log(errArray,"validating");
        next(errArray);

    }else{
        console.log(errArray,"validation error");
        next();

    }
}