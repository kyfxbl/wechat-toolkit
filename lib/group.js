var urllib = require("urllib");

exports.addGroup = addGroup;
exports.queryGroup = queryGroup;

// name should be less than 30
// callback(err, group_id)
function addGroup(access_token, name, callback){

    var url = "https://api.weixin.qq.com/cgi-bin/groups/create?access_token=" + access_token;

    var options = {
        method: "POST",
        dataType: "json",
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            group: {
                name: name
            }
        }
    };

    urllib.request(url, options, function(err, body, resp){

        if(err){
            callback(err);
            return;
        }

        if(body.errcode){
            callback(body);
            return;
        }

        callback(null, body.group.id);
    });
}

// callback(err, result)
function queryGroup(access_token, callback){

    var url = "https://api.weixin.qq.com/cgi-bin/groups/get?access_token=" + access_token;

    var options = {
        method: "GET",
        dataType: "json"
    };

    urllib.request(url, options, function(err, body, resp){

        if(err){
            callback(err);
            return;
        }

        if(body.errcode){
            callback(body);
            return;
        }

        callback(null, body.groups);
    });
}