var urllib = require("urllib");

exports.broadcastNewsByGroup = broadcastNewsByGroup;

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