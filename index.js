var passive = require("./lib/passive_message");
var parser = require("./lib/wechat_bodyparser");
var virgin = require("./lib/enable_dev_mode");
var media = require("./lib/media");
var menu = require("./lib/toolbar_menu");
var cs = require("./lib/customer_service_message");
var access_token = require("./lib/access_token");
var validate = require("./lib/validate");
var group = require("./lib/group");
var fan = require("./lib/fan_info");
var broadcast = require("./lib/broadcast_message");
var news = require("./lib/upload_news");
var nickname = require("./lib/nickname");
var oauth2 = require("./lib/oauth2");

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
exports.queryMenu = menu.queryMenu;

// customer service message
exports.csReplyText = cs.replyTextMessage;
exports.csReplyNews = cs.replyNewsMessge;

// upload and download media resource
exports.uploadMedia = media.uploadMedia;
exports.downloadMedia = media.downloadMedia;

// group operation
exports.addGroup = group.addGroup;
exports.queryGroup = group.queryGroup;
exports.fanInGroup = group.fanInGroup;
exports.modifyGroup = group.modifyGroup;
exports.moveFan = group.moveFan;

// fan info
exports.getFanInfo = fan.getFanInfo;
exports.getFans = fan.getFans;

// upload news message
exports.uploadNews = news.uploadNews;

// broadcast
exports.broadcastNewsByGroup = broadcast.broadcastNewsByGroup;
exports.broadcastNewsByOpenId = broadcast.broadcastNewsByOpenId;
exports.withdraw = broadcast.withdrawBroadcast;

// nickname
exports.modifyNickname = nickname.modifyNickname;

// oauth2
exports.exchangeAccessToken = oauth2.exchangeAccessToken;