var urllib = require("urllib");

exports.exchangeAccessToken = exchangeAccessToken;
exports.refreshAccessToken = refreshAccessToken;
exports.getUserInfo = getUserInfo;
exports.validateAccessToken = validateAccessToken;

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

// callback(err, result)
function getUserInfo(access_token, fan_open_id, callback){

    var url = "https://api.weixin.qq.com/sns/userinfo?access_token=" + access_token + "&openid=" + fan_open_id + "&lang=zh_CN";

    var options = {
        method: "GET",
        dataType: "json"
    };

    urllib.request(url, options, function(err, body, resp){

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

// callback(err, flag)
function validateAccessToken(access_token, open_id, callback){

    var url = "https://api.weixin.qq.com/sns/auth?access_token=" + access_token + "&openid=" + open_id;

    var options = {
        method: "GET",
        dataType: "json"
    };

    urllib.request(url, options, function(err, body, resp){

        if(err){
            callback(err);
            return;
        }

        if(body.errcode !== 0){
            callback(null, false);
            return;
        }

        callback(null, true);
    });
}