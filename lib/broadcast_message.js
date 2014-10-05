var urllib = require("urllib");

exports.uploadNews = uploadNews;
exports.broadcastNewsByGroup = broadcastNewsByGroup;
exports.broadcastNewsByOpenId = broadcastNewsByOpenId;
exports.withdrawBroadcast = withdrawBroadcast;

// news should be an array
// callback(err, media_id, created_at)
function uploadNews(access_token, news, callback){

    var url = "https://api.weixin.qq.com/cgi-bin/media/uploadnews?access_token=" + access_token;

    var opts = {
        dataType: 'json',
        type: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {articles: news}
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

        callback(null, body.media_id, body.created_at);
    });
}

function broadcastNewsByGroup(access_token, group_id, news_id, callback){

    var url = "https://api.weixin.qq.com/cgi-bin/message/mass/sendall?access_token=" + access_token;

    var opts = {
        dataType: 'json',
        type: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            "filter":{
                "group_id": group_id
            },
            "mpnews":{
                "media_id": news_id
            },
            "msgtype": "mpnews"
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

function broadcastNewsByOpenId(access_token, openids, news_id, callback){

    var url = "https://api.weixin.qq.com/cgi-bin/message/mass/send?access_token=" + access_token;

    var opts = {
        dataType: 'json',
        type: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            "touser": openids,
            "mpnews":{
                "media_id": news_id
            },
            "msgtype": "mpnews"
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

function withdrawBroadcast(access_token, msg_id, callback){

    var url = "https://api.weixin.qq.com/cgi-bin/message/mass/delete?access_token=" + access_token;

    var opts = {
        dataType: 'json',
        type: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            msg_id: msg_id
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