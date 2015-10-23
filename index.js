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
var nickname = require("./lib/nickname");
var oauth2 = require("./lib/oauth2");
var qrcode = require("./lib/qrcode");
var short = require("./lib/short_url");
var simulator = require("./lib/wx_request_simulator");
var template = require("./lib/template_message");
var jsapi_ticket = require("./lib/jsapi_ticket");
var order = require("./lib/order");
var payment = require("./lib/payment");
var permanent = require("./lib/permanent_material");
var preview = require("./lib/preview_message");

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

// jsapi_ticket
exports.getJsApiTicket = jsapi_ticket.getJsApiTicket;

// custom menu
exports.createMenu = menu.createMenu;
exports.queryMenu = menu.queryMenu;
exports.deleteMenu = menu.deleteMenu;

// customer service message
exports.csReplyCSText = cs.replyCSTextMessage;
exports.csReplyCSNews = cs.replyCSNewsMessage;
exports.replyCSImageMessage = cs.replyCSImageMessage;
exports.replyCSVoiceMessage = cs.replyCSVoiceMessage;
exports.replyCSVideoMessage = cs.replyCSVideoMessage;

// upload and download temporary material resource
exports.uploadMedia = media.uploadMedia;
exports.downloadMedia = media.downloadMedia;

// upload and download permanent material resource
exports.uploadPermanentNewsMaterial = permanent.uploadPermanentNewsMaterial;
exports.uploadImageForNewsContent = permanent.uploadImageForNewsContent;
exports.uploadPermanentVideoMaterial = permanent.uploadPermanentVideoMaterial;
exports.uploadPermanentImageMaterial = permanent.uploadPermanentImageMaterial;
exports.uploadPermanentVoiceMaterial = permanent.uploadPermanentVoiceMaterial;
exports.uploadPermanentThumbMaterial = permanent.uploadPermanentThumbMaterial;

// group operation
exports.addGroup = group.addGroup;
exports.queryGroup = group.queryGroup;
exports.fanInGroup = group.fanInGroup;
exports.modifyGroup = group.modifyGroup;
exports.moveFan = group.moveFan;

// fan info
exports.getFanInfo = fan.getFanInfo;
exports.getFans = fan.getFans;

// broadcast
exports.uploadNews = broadcast.uploadNews;
exports.broadcastNewsByGroup = broadcast.broadcastNewsByGroup;
exports.broadcastNewsByOpenId = broadcast.broadcastNewsByOpenId;
exports.withdraw = broadcast.withdrawBroadcast;
exports.broadcastMessageToAll = broadcast.broadcastMessageToAll;
exports.broadcastNewsToAll = broadcast.broadcastNewsToAll;
exports.broadcastVideoToAll = broadcast.broadcastVideoToAll;
exports.broadcastImageToAll = broadcast.broadcastImageToAll;
exports.broadcastVoiceToAll = broadcast.broadcastVoiceToAll;

// nickname
exports.modifyNickname = nickname.modifyNickname;

// oauth2
exports.exchangeAccessToken = oauth2.exchangeAccessToken;
exports.refreshAccessToken = oauth2.refreshAccessToken;
exports.getUserInfo = oauth2.getUserInfo;
exports.validateAccessToken = oauth2.validateAccessToken;

// qrcode
exports.generateTempQR = qrcode.generateTempQR;
exports.generateEternalQR = qrcode.generateEternalQR;
exports.getQR = qrcode.getQR;
exports.qrcodeURL = qrcode.qrcodeURL;
exports.generateEternalQrBySceneStr = qrcode.generateEternalQrBySceneStr;

// short url
exports.shortenURL = short.shortenURL;

// simulate weixin request
exports.simulateEvent = simulator.simulateEvent;

// template message
exports.sendTemplateMessage = template.sendTemplateMessage;

// order detail
exports.getOrderDetail = order.getOrderDetail;

// redpack
exports.cash_redpack = payment.cash_redpack;

// preview message
exports.previewTextMessage = preview.previewTextMessage;
exports.previewNewsMessage = preview.previewNewsMessage;
exports.previewImageMessage = preview.previewImageMessage;
exports.previewVoiceMessage = preview.previewVoiceMessage;
exports.previewVideoMessage = preview.previewVideoMessage;