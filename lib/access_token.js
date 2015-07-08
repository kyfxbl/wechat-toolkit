var urllib = require("urllib");

// callback(err, access_token)
exports.getAccessToken = function(app_id, app_secret, callback){

    var url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + app_id + "&secret=" + app_secret;

    var options = {
        method: "GET",
        dataType: "json"
    };

    urllib.request(url, options, function(err, body, resp){

        if(err){
            callback(err);
            return;
        }

        if(resp.statusCode !== 200){
            callback("statusCode not 200");
            return;
        }

        if(!body){
            callback("response body is null");
            return;
        }

        if(body.errcode){
            callback(body);
            return;
        }

        callback(null, body.access_token);
    });
};