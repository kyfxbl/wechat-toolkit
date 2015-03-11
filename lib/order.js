var urllib = require("urllib");

exports.getOrderDetail= function(access_token, order_id, callback){

    var url = "https://api.weixin.qq.com/merchant/order/getbyid?access_token=" + access_token;

    var options = {
        method: "POST",
        dataType: "json",
        headers: {
            'Content-Type': 'application/json'
        },
        data: order_id
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

        callback(null, body.order);
    });
};