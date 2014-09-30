var passive = require("./lib/passive_message");
var parser = require("./lib/wechat_bodyparser");
var virgin = require("./lib/enable_dev_mode");
var media = require("./lib/media");
var menu = require("./lib/toolbar_menu");
var cs = require("./lib/customer_service_message");
var access_token = require("./lib/access_token");
var validate = require("./lib/validate");

// enable development mode at first time
exports.enable_dev_mode = virgin.enable_dev_mode;

// middleware for express, parse result will be placed in req.weixin object
exports.xml_parser = parser;

// validate the message, to confirm it comes from wechat server
exports.validate = validate.validate;

// reply message
exports.replyTextMessage = passive.replyTextMessage;
exports.replyNewsMessage = passive.replyNewsMessage;

// access_token
exports.getAccessToken = access_token.getAccessToken;

// custom menu
exports.createMenu = menu.createMenu;

// customer service message
exports.csReplyText = cs.replyTextMessage;
exports.csReplyNews = cs.replyNewsMessge;