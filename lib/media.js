var fs = require("fs");
var path = require("path");
var formstream = require("formstream");
var urllib = require("urllib");

exports.uploadMedia = uploadMedia;
exports.downloadMedia = downloadMedia;

// callback(err, type, media_id, create_date)
function uploadMedia(access_token, title, introduction, filepath, callback){

    var url = "https://api.weixin.qq.com/cgi-bin/material/add_material?access_token=" + access_token;

    fs.stat(filepath, function(err, stat) {
        if(err){
            callback(err);
            return;
        }

       
       var array = JSON.stringify({title: title, introduction: introduction});

       var form = formstream();
       form.file('media', filepath, path.basename(filepath), stat.size);
       form.field('description', array);

        var opts = {
            dataType: 'json',
            type: 'POST',
            timeout: 200000,
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

            callback(null, body.media_id, body.created_at);
        });
    });
}

function downloadMedia(access_token, media_id, callback){

    var url = "http://file.api.weixin.qq.com/cgi-bin/media/get?access_token=" + access_token + "&media_id=" + media_id;

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

