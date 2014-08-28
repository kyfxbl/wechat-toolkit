var request = require("request");

exports.getAccessToken = function(app_id, app_secret, callback){

    var url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + app_id + "&secret=" + app_secret;

    var options = {
        method: "GET",
        uri: url,
        json: true
    };

    request(options, function(err, response, body){

        if(err){
            callback(err);
            return;
        }

        if(body.errcode){
            callback(body);
            return;
        }

        callback(null, body.access_token);
    });
};