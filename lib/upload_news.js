var urllib = require("urllib");

exports.uploadNews = uploadNews;

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