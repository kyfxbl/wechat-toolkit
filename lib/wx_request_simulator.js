var sha1 = require("sha1");
var urllib = require("urllib");
var _ = require("underscore");

exports.simulateEvent = simulateEvent;

function simulateEvent(url, token, fan_open_id, eventKey){

    var nonce = "nonce";
    var timestamp = new Date().getTime() + "";

    var sorted = _.sortBy([token, timestamp, nonce], function(item){
        return item;
    });

    var origin = sorted.join("");
    var signature = sha1(origin);

    var dist = url + "?signature=" + signature + "&timestamp=" + timestamp + "&nonce=" + nonce;

    var content = "<xml><ToUserName>origin_id</ToUserName><FromUserName>"+ fan_open_id + "</FromUserName><CreateTime>123456789</CreateTime><MsgType>event</MsgType><Event>CLICK</Event><EventKey>" + eventKey + "</EventKey></xml>";

    var options = {
        method: "POST",
        dataType: "text",
        headers: {
            'Content-Type': 'application/xml'
        },
        content: content
    };

    urllib.request(dist, options, function(err, body, resp){

        if(err){
            console.log(err);
            return;
        }

        console.log(body);
    });
}