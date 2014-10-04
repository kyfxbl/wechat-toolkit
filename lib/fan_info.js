var urllib = require("urllib");

exports.getFanInfo = getFanInfo;
exports.getFans = getFans;

// callback(err, info)
function getFanInfo(access_token, fan_open_id, callback){

    var url = "https://api.weixin.qq.com/cgi-bin/user/info?access_token=" + access_token + "&openid=" + fan_open_id;

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

// next_open_id empty means query from beginning
// callback(err, result)
function getFans(access_token, next_open_id, callback){

    var url = "https://api.weixin.qq.com/cgi-bin/user/get?access_token=" + access_token;

    if(next_open_id){
        url = url + "&next_openid=" + next_open_id;
    }

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