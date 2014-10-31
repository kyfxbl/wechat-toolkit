var urllib = require("urllib");

exports.sendTemplateMessage = sendTemplateMessage;

/**
{
    access_token: "xxx",
    fan_open_id: "xxx",
    template_id: "xxx",
    url: "http://www.baidu.com",
    top_color: "#ffffff",
    data: {}
}
*/
function sendTemplateMessage(obj, callback){

    var message = {
        touser: obj.fan_open_id,
        template_id: obj.template_id,
        url: obj.url,
        topcolor: obj.top_color,
        data: obj.data
    };

    var url = "https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=" + obj.access_token;

    var options = {
        method: "POST",
        dataType: "json",
        headers: {
            'Content-Type': 'application/json'
        },
        data: message
    };

    urllib.request(url, options, function(err, body, resp){

        if(err){
            callback(err);
            return;
        }

        var code = body.errcode;
        var message = body.errmsg;
        callback(null, code, message);
    });
}