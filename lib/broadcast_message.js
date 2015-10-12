var urllib = require("urllib");

exports.uploadNews = uploadNews;
exports.broadcastNewsByGroup = broadcastNewsByGroup;
exports.broadcastNewsByOpenId = broadcastNewsByOpenId;
exports.withdrawBroadcast = withdrawBroadcast;
exports.broadcastMessageToAll = broadcastMessageToAll;
exports.broadcastNewsToAll = broadcastNewsToAll;
exports.broadcastVideoToAll = broadcastVideoToAll;
exports.broadcastImageToAll = broadcastImageToAll;
exports.broadcastVoiceToAll = broadcastVoiceToAll;

// news should be an array
// callback(err, media_id, created_at)
function uploadNews(access_token, news, callback){

    var url = "https://api.weixin.qq.com/cgi-bin/material/add_news?access_token=" + access_token;

    var opts = {
        dataType: 'json',
        type: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        timeout: 100000,
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

        callback(null, body.media_id);
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

function broadcastNewsToAll(access_token, news_id, callback){

    var url = "https://api.weixin.qq.com/cgi-bin/message/mass/sendall?access_token=" + access_token;

    var opts = {
        dataType: 'json',
        type: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
         "filter":{
          "is_to_all":true
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

function broadcastVideoToAll(access_token, media_id, callback){

    var url = "https://api.weixin.qq.com/cgi-bin/message/mass/sendall?access_token=" + access_token;

    var opts = {
        dataType: 'json',
        type: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
         "filter":{
          "is_to_all":true
      },
      "mpvideo":{
        "media_id": media_id
    },
    "msgtype": "mpvideo"
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

function broadcastImageToAll(access_token, media_id, callback){

    var url = "https://api.weixin.qq.com/cgi-bin/message/mass/sendall?access_token=" + access_token;

    var opts = {
        dataType: 'json',
        type: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
         "filter":{
          "is_to_all":true
      },
      "image":{
        "media_id": media_id
    },
    "msgtype": "image"
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

function broadcastVoiceToAll(access_token, media_id, callback){

    var url = "https://api.weixin.qq.com/cgi-bin/message/mass/sendall?access_token=" + access_token;

    var opts = {
        dataType: 'json',
        type: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
         "filter":{
          "is_to_all":true
      },
      "voice":{
        "media_id": media_id
    },
    "msgtype": "voice"
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

function broadcastMessageToAll(access_token, message, callback){

    var url = "https://api.weixin.qq.com/cgi-bin/message/mass/sendall?access_token=" + access_token;

    var opts = {
        dataType: 'json',
        type: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
         "filter":{
          "is_to_all":true
      },
      "text":{
        "content": message
    },
    "msgtype": "text"
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