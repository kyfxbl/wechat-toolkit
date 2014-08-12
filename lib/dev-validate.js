var validator = require("./immediately-response");

exports.enable_dev_mode = function(token){

    return function(req, res, next){

        var echostr = req.query["echostr"];

        var flag = validator.validate(req, token);

        if(flag){
            res.send(echostr);
        }else{
            res.send("validate failure");
        }
    }
};
