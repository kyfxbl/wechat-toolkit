var sha1 = require("sha1");
var _ = require("underscore");

exports.validate = validate;

function validate(req, token){

    var signature = req.query["signature"];
    var timestamp = req.query["timestamp"];
    var nonce = req.query["nonce"];

    var sorted = _.sortBy([token, timestamp, nonce], function(item){
        return item;
    });

    var origin = sorted.join("");
    var encoded = sha1(origin);

    return encoded === signature;
}