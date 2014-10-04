var urllib = require("urllib");

exports.modifyNickname = modifyNickname;

function modifyNickname(access_token, fan_open_id, nickname, callback){

    var url = "https://api.weixin.qq.com/cgi-bin/user/info/updateremark?access_token=" + access_token;

    var opts = {
        dataType: 'json',
        type: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            "openid": fan_open_id,
            "remark": nickname
        }
    };

    urllib.request(url, opts, function(err, body, resp){

        if(err){
            callback(err);
            return;
        }

        callback(null, body);
    });
}

