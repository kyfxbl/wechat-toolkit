var fs = require("fs");
var path = require("path");
var formstream = require("formstream");
var urllib = require("urllib");

exports.uploadMedia = function(access_token, type, filepath, callback){

    var url = "http://file.api.weixin.qq.com/cgi-bin/media/upload?access_token=" + access_token + "&type=" + type;

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


