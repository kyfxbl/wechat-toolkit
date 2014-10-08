var urllib = require("urllib");

exports.shortenURL = shortenURL;

// callback(err, short_url)
function shortenURL(access_token, long_url, callback){

    var url = "https://api.weixin.qq.com/cgi-bin/shorturl?access_token=" + access_token;

    var opts = {
        dataType: 'json',
        type: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            action: "long2short",
            long_url: long_url
        }
    };

    urllib.request(url, opts, function(err, body, resp){

        if(err){
            callback(err);
            return;
        }

        if(body.errcode !== 0){
            callback(body);
            return;
        }

        callback(null, body.short_url);
    });
}