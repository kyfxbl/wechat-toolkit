var urllib = require("urllib");

exports.generateTempQR = generateTempQR;
exports.generateEternalQR = generateEternalQR;
exports.getQR = getQR;
exports.qrcodeURL = qrcodeURL;

// expire_seconds should less than 1800
// scene_id should be an integer
// callback(err, result)
function generateTempQR(access_token, expire_seconds, scene_id, callback){

    var url = "https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token=" + access_token;

    var opts = {
        dataType: 'json',
        type: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            expire_seconds: expire_seconds,
            action_name: "QR_SCENE",
            action_info: {
                scene: {
                    scene_id: scene_id
                }
            }
        }
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

// scene_id should be 1-100000
// callback(err, result)
function generateEternalQR(access_token, scene_id, callback){

    var url = "https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token=" + access_token;

    var opts = {
        dataType: 'json',
        type: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            action_name: "QR_LIMIT_SCENE",
            action_info: {
                scene: {
                    scene_id: scene_id
                }
            }
        }
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

// callback(err, body)
function getQR(ticket, callback){

    var url = qrcodeURL(ticket);

    var options = {
        method: "GET"
    };

    urllib.request(url, options, function(err, body, resp){

        if(err){
            callback(err);
            return;
        }

        if(resp.status === 404){
            callback({code: 404, msg: "qrcode not found"});
            return;
        }

        callback(null, body);
    });
}

// the qrcode url, could be displayed by img tag
function qrcodeURL(ticket){
    return "https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=" + ticket;
}