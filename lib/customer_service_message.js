var urllib = require("urllib");
var _ = require("underscore");

exports.replyTextMessge = replyTextMessge;
exports.replyNewsMessge = replyNewsMessge;
exports.replyImageMessge = replyImageMessge;
exports.replyVoiceMessge = replyVoiceMessge;
exports.replyVideoMessge = replyVideoMessge;

var csMessageURL = "https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=";

function replyTextMessge(access_token, fan_open_id, text, callback){

    var message = {
        touser: fan_open_id,
        msgtype: "text",
        text: {
            content: text
        }
    };

    var url = csMessageURL + access_token;

    var options = {
        method: "POST",
        dataType: "json",
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

function replyImageMessge(access_token, fan_open_id, mediaid, callback){

    var message = {
        touser: fan_open_id,
        msgtype: "image",
        image: {
            media_id: mediaid
        }
    };

    var url = csMessageURL + access_token;

    var options = {
        method: "POST",
        dataType: "json",
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

function replyVoiceMessge(access_token, fan_open_id, mediaid, callback){

    var message = {
        touser: fan_open_id,
        msgtype: "voice",
        voice: {
            media_id: mediaid
        }
    };

    var url = csMessageURL + access_token;

    var options = {
        method: "POST",
        dataType: "json",
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

function replyVideoMessge(access_token, thumb_media_id, title, description ,fan_open_id, mediaid, callback){

    var message = {
        touser: fan_open_id,
        msgtype: "video",
        video: {
            media_id: mediaid,
            thumb_media_id: thumb_media_id,
            title: title,
            description: description
        }
    };

    var url = csMessageURL + access_token;

    var options = {
        method: "POST",
        dataType: "json",
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

/**
 * 发送客服图文消息
 * @param access_token
 * @param fan_open_id 目标用户的openId
 * @param news 消息数组，[]，包含字段title，description，url，picurl
 * @param callback (err, code, msg)
 */
function replyNewsMessge(access_token, fan_open_id, news, callback){

    var adjust = [];

    _.each(news, function(item){

        var obj = _.clone(item);
        if(obj.picUrl){
            obj.picurl = obj.picUrl;
            delete obj.picUrl;
        }
        adjust.push(obj);
    });

    var message = {
        touser: fan_open_id,
        msgtype: "news",
        news: {
            articles: adjust
        }
    };

    var url = csMessageURL + access_token;

    var options = {
        method: "POST",
        dataType: "json",
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