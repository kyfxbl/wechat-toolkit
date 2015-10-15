var fs = require("fs");
var path = require("path");
var formstream = require("formstream");
var urllib = require("urllib");

exports.uploadPermanentNewsMaterial = uploadPermanentNewsMaterial;
exports.uploadImageForNewsContent = uploadImageForNewsContent;
exports.uploadPermanentVideoMaterial = uploadPermanentVideoMaterial;
exports.uploadPermanentImageMaterial = uploadPermanentImageMaterial;
exports.uploadPermanentVoiceMaterial = uploadPermanentVoiceMaterial;
exports.uploadPermanentThumbMaterial = uploadPermanentThumbMaterial;

// callback(err, media_id)
function uploadPermanentNewsMaterial(access_token, articles, callback){

    var url = "https://api.weixin.qq.com/cgi-bin/material/add_news?access_token=" + access_token;

    var options = {
        method: "POST",
        dataType: "json",
        headers: {
            'Content-Type': 'application/json'
        },
        data: articles
    };

    urllib.request(url, options, function(err, body, resp){

        if(err){
            callback(err);
            return;
        }

        if(resp.statusCode !== 200){
            callback("statusCode not 200");
            return;
        }

        if(!body){
            callback("response body is null");
            return;
        }

        if(body.errcode){
            callback(body);
            return;
        }

        callback(null, body.media_id);
    });
}

// callback(err, url)
function uploadImageForNewsContent(access_token, image_path, callback){

    var url = "https://api.weixin.qq.com/cgi-bin/media/uploadimg?access_token=" + access_token;

    fs.stat(image_path, function(err, stat) {

        if(err){
            callback(err);
            return;
        }

        var form = formstream();
        form.file('media', image_path, path.basename(image_path), stat.size);

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

            if(resp.statusCode !== 200){
                callback("statusCode not 200");
                return;
            }

            if(!body){
                callback("response body is null");
                return;
            }

            if(body.errcode){
                callback(body);
                return;
            }

            callback(null, body.url);
        });
    });
}

// callback(err, media_id)
function uploadPermanentVideoMaterial(access_token, filepath, description, callback){

    var url = "https://api.weixin.qq.com/cgi-bin/material/add_material?access_token=" + access_token;

    fs.stat(filepath, function(err, stat) {

        if(err){
            callback(err);
            return;
        }

        var form = formstream();
        form.file('media', filepath, path.basename(filepath), stat.size);
        form.field('description', JSON.stringify(description));

        var opts = {
            dataType: 'json',
            type: 'POST',
            timeout: 5 * 60 * 1000,
            headers: form.headers(),
            stream: form
        };

        urllib.request(url, opts, function(err, body, resp){

            if(err){
                callback(err);
                return;
            }

            if(resp.statusCode !== 200){
                callback("statusCode not 200");
                return;
            }

            if(!body){
                callback("response body is null");
                return;
            }

            if(body.errcode){
                callback(body);
                return;
            }

            callback(null, body.media_id);
        });
    });
}

// callback(err, media_id, url)
function uploadPermanentImageMaterial(access_token, filepath, callback){

    _uploadPermanentOtherTypeMaterial(access_token, filepath, "image", callback);
}

// callback(err, media_id)
function uploadPermanentVoiceMaterial(access_token, filepath, callback){

    _uploadPermanentOtherTypeMaterial(access_token, filepath, "voice", callback);
}

function uploadPermanentThumbMaterial(access_token, filepath, callback){

    _uploadPermanentOtherTypeMaterial(access_token, filepath, "thumb", callback);
}

// for image, voice, thumb
function _uploadPermanentOtherTypeMaterial(access_token, filepath, type, callback){

    var url = "https://api.weixin.qq.com/cgi-bin/material/add_material?access_token=" + access_token;

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
            timeout: 5 * 60 * 1000,
            headers: form.headers(),
            stream: form
        };

        urllib.request(url, opts, function(err, body, resp){

            if(err){
                callback(err);
                return;
            }

            if(resp.statusCode !== 200){
                callback("statusCode not 200");
                return;
            }

            if(!body){
                callback("response body is null");
                return;
            }

            if(body.errcode){
                callback(body);
                return;
            }

            if(type === "image"){
                callback(null, body.media_id, body.url);
            }else{
                callback(null, body.media_id);
            }
        });
    });
}