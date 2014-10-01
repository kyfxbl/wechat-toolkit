var urllib = require("urllib");

exports.addGroup = addGroup;
exports.queryGroup = queryGroup;
exports.fanInGroup = fanInGroup;
exports.modifyGroup = modifyGroup;
exports.moveFan = moveFan;

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

// callback(err, group_id)
// group_id equals 0 means no group
function fanInGroup(access_token, fan_open_id, callback){

    var url = "https://api.weixin.qq.com/cgi-bin/groups/getid?access_token=" + access_token;

    var options = {
        method: "POST",
        dataType: "json",
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            openid: fan_open_id
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

        callback(null, body.groupid);
    });
}

// callback(err)
function modifyGroup(access_token, group_id, group_name, callback){

    var url = "https://api.weixin.qq.com/cgi-bin/groups/update?access_token=" + access_token;

    var options = {
        method: "POST",
        dataType: "json",
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            group: {
                id: group_id,
                name: group_name
            }
        }
    };

    urllib.request(url, options, function(err, body, resp){

        if(err){
            callback(err);
            return;
        }

        if(body.errcode !== 0){
            callback(body);
            return;
        }

        callback(null);
    });
}

// callback(err)
function moveFan(access_token, fan_open_id, to_group_id, callback){

    var url = "https://api.weixin.qq.com/cgi-bin/groups/members/update?access_token=" + access_token;

    var options = {
        method: "POST",
        dataType: "json",
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            openid: fan_open_id,
            to_groupid: to_group_id
        }
    };

    urllib.request(url, options, function(err, body, resp){

        if(err){
            callback(err);
            return;
        }

        if(body.errcode !== 0){
            callback(body);
            return;
        }

        callback(null);
    });
}