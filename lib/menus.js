var request = require("request");

exports.createMenu = function(access_token, menu_data, callback){

    var url = "https://api.weixin.qq.com/cgi-bin/menu/create?access_token=" + access_token;

    var options = {
        method: "POST",
        uri: url,
        body: menu_data,
        json: true
    };

    request(options, function(err, response, body) {

        if(err){
            callback(err);
            return;
        }

        var error_code = body.errcode;
        var error_message = body.errmsg;
        callback(null, error_code, error_message);
    });
};