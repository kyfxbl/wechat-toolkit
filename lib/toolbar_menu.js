var urllib = require("urllib");

exports.createMenu = function(access_token, menu_data, callback){

    var url = "https://api.weixin.qq.com/cgi-bin/menu/create?access_token=" + access_token;

    var options = {
        method: "POST",
        dataType: "json",
        data: menu_data
    };

    urllib.request(url, options, function(err, body, resp){

        if(err){
            callback(err);
            return;
        }

        var error_code = body.errcode;
        var error_message = body.errmsg;
        callback(null, error_code, error_message);
    });
};