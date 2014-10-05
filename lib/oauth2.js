var urllib = require("urllib");

exports.exchangeAccessToken = exchangeAccessToken;
exports.refreshAccessToken = refreshAccessToken;

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

// callback(err, result)
function refreshAccessToken(app_id, refresh_token, callback){

    var url = "https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=" + app_id + "&grant_type=refresh_token&refresh_token=" + refresh_token;

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