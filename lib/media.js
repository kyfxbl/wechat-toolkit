var fs = require("fs");
var path = require("path");
var formstream = require("formstream");
var urllib = require("urllib");

exports.uploadMedia = uploadMedia;
exports.downloadMedia = downloadMedia;

// callback(err, type, media_id, create_date)
function uploadMedia(access_token, type, filepath, callback){

    var url = "https://api.weixin.qq.com/cgi-bin/media/upload?access_token=" + access_token + "&type=" + type;

    fs.stat(filepath, function(err, stat) {

        if(err){
            callback(err);
            return;
        }

        var form = formstream();
        form.file('media', filepath, path.basename(filepath), stat.size);

        var opts = {
            dataType: 'json',
            type: 'POST',
            headers: form.headers(),
            stream: form
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

            callback(null, body.type, body.media_id, body.created_at);
        });
    });
}

function downloadMedia(access_token, media_id, callback){

    var url = "https://api.weixin.qq.com/cgi-bin/media/get?access_token=" + access_token + "&media_id=" + media_id;

    var opts = {
        type: 'GET'
    };

    urllib.request(url, opts, function(err, body, resp){

        if(err){
            callback(err);
            return;
        }

        callback(null, body);
    });
}

