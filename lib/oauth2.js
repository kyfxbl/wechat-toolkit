var urllib = require("urllib");

exports.exchangeAccessToken = exchangeAccessToken;

// callback(err, result)
function exchangeAccessToken(app_id, app_secret, code, callback){

    var url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=" + app_id + "&secret=" + app_secret + "&code=" + code + "&grant_type=authorization_code";

    var opts = {
        dataType: 'json',
        type: 'GET'
    };

    urllib.request(url, opts, function(err, body, resp){

        if(err){
            callback(err);
            return;
        }

        if(body.errcode){
            callback(body);
            return;
        }

        callback(null, body);
    });
}

