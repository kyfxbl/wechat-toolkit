var immediate = require("./lib/immediately-response");
var parser = require("./lib/express-weixin-bodyparser");
var virgin = require("./lib/dev-validate");

// enable development mode at first time
exports.enable_dev_mode = virgin.enable_dev_mode;

// middleware for express, parse result will be placed in req.weixin object
exports.xml_parser = parser;

// validate the message, to confirm it comes from wechat server
exports.validate = immediate.validate;

// reply message
exports.replyTextMessage = immediate.replyTextMessage;
exports.replyNewsMessage = immediate.replyNewsMessage;
