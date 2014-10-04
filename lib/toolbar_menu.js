var urllib = require("urllib");

exports.createMenu = createMenu;
exports.queryMenu = queryMenu;

function createMenu(access_token, menu_data, callback){

    var url = "https://api.weixin.qq.com/cgi-bin/menu/create?access_token=" + access_token;

    var options = {
        method: "POST",
        dataType: "json",
        headers: {
            'Content-Type': 'application/json'
        },
        data: menu_data
    };

    urllib.request(url, options, function(err, body, resp){

        if(err){
            callback(err);
            return;
        }

        var error_code = body.errcode;
        var error_message = body.errmsg;
        callback(null, error_code, error_message);
    });
};

function queryMenu(access_token, callback){

    var url = "https://api.weixin.qq.com/cgi-bin/menu/get?access_token=" + access_token;

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

        callback(null, body);
    });
}