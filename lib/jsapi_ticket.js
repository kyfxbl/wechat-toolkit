var urllib = require("urllib");

// callback(err, ticket)
exports.getJsApiTicket = function(access_token, callback){

    var url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=" + access_token + "&type=jsapi";
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
        callback(null, body.ticket);
    });
};