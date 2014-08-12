var immediate = require("./lib/immediately-response");
var parser = require("./lib/express-weixin-bodyparser");

exports.xml_parser = parser;
exports.assembleTextMessage = immediate.assembleTextMessage;
exports.assembleNewsMessage = immediate.assembleNewsMessage;