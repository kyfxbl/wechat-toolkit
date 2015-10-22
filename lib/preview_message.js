var urllib = require("urllib");
var _ = require("underscore");

exports.previewTextMessage = previewTextMessage;
exports.previewNewsMessage = previewNewsMessage;
exports.previewImageMessage = previewImageMessage;
exports.previewVoiceMessage = previewVoiceMessage;
exports.previewVideoMessage = previewVideoMessage;

var csMessageURL = "https://api.weixin.qq.com/cgi-bin/message/mass/preview?access_token=";

function previewTextMessage(access_token, fan_open_id, text, callback){

    var message = {
        touser: fan_open_id,
        text: {
            content: text
        },
    msgtype: "text"
    };

    var url = csMessageURL + access_token;

    var options = {
        method: "POST",
        dataType: "json",
        timeout: 100000,
        headers: {
            'Content-Type': 'application/json'
        },
        data: message
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
}

function previewImageMessage(access_token, fan_open_id, mediaid, callback){

    var message = {
        touser: fan_open_id,
        image: {
            media_id: mediaid
        },
        msgtype: "image"
    };

    var url = csMessageURL + access_token;

    var options = {
        method: "POST",
        dataType: "json",
        timeout: 100000,
        headers: {
            'Content-Type': 'application/json'
        },
        data: message
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
}

function previewVoiceMessage(access_token, fan_open_id, mediaid, callback){

    var message = {
        touser: fan_open_id,
        voice: {
            media_id: mediaid
        },
        msgtype: "voice",
    };

    var url = csMessageURL + access_token;

    var options = {
        method: "POST",
        dataType: "json",
        timeout: 100000,
        headers: {
            'Content-Type': 'application/json'
        },
        data: message
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
}

function previewVideoMessage(access_token, fan_open_id, mediaid, callback){

    var message = {
        touser: fan_open_id,
        mpvideo: {
            media_id: mediaid
                },
     msgtype: "mpvideo"
    };

    var url = csMessageURL + access_token;

    var options = {
        method: "POST",
        dataType: "json",
        timeout: 100000,
        headers: {
            'Content-Type': 'application/json'
        },
        data: message
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
}


function previewNewsMessage(access_token, fan_open_id, mediaid, callback){

     var message = {
        touser: fan_open_id,
        mpnews: {
            media_id: mediaid
                },
     msgtype: "mpnews"
    };

    var url = csMessageURL + access_token;

    var options = {
        method: "POST",
        dataType: "json",
        timeout: 100000,
        headers: {
            'Content-Type': 'application/json'
        },
        data: message
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
}