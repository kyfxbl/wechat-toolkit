var parseString = require('xml2js').parseString;

var utils = {
    hasBody: function (req) {
        var encoding = 'transfer-encoding' in req.headers;
        var length = 'content-length' in req.headers && req.headers['content-length'] !== '0';
        return encoding || length;
    },
    mime: function (req) {
        var str = req.headers['content-type'] || '';
        return str.split(';')[0];
    }
};

var regexp = /^(text\/xml|application\/([\w!#\$%&\*`\-\.\^~]+\+)?xml)$/i;

module.exports = function (opts) {

    var options = opts || {
        async: true,
        explicitArray: true,
        normalize: true,
        normalizeTags: true,
        trim: true
    };

    return function(req, res, next) {

        var data = '';

        if (req._body) {
            return next();
        }

        req.body = req.body || {};

        if (!utils.hasBody(req) || !regexp.test(utils.mime(req))){
            return next();
        }

        req._body = true;

        req.setEncoding('utf-8');

        req.on('data', function (chunk) {
            data += chunk;
        });

        req.on('end', function () {

            parseString(data, options, function (err, xml) {

                if (err) {
                    err.status = 400;
                    return next(err);
                }
                req.body = xml;
                req.rawBody = data;

                // begin parsing xml data from wechat request body
                req.weixin = {};

                if(!req.body || !req.body.xml){
                    return next();
                }

                console.log("receive message from wechat:");
                var content = req.body.xml;

                req.weixin.my_origin_id = content.tousername[0];
                req.weixin.fan_open_id = content.fromusername[0];
                req.weixin.message_time = Number(content.createtime[0]);
                req.weixin.message_type = content.msgtype[0];

                switch(req.weixin.message_type){

                    case "text":
                        req.weixin.message_id = content.msgid[0];
                        req.weixin.content = content.content[0];
                        break;

                    case "image":
                        req.weixin.pic_url = content.picurl[0];
                        req.weixin.media_id = content.mediaid[0];
                        req.weixin.message_id = content.msgid[0];
                        break;

                    case "voice":
                        req.weixin.message_id = content.msgid[0];
                        req.weixin.format = content.format[0];
                        req.weixin.media_id = content.mediaid[0];
                        if(content.recognition){
                            req.weixin.recognition = content.recognition[0];
                        }
                        break;

                    case "video":
                        req.weixin.message_id = content.msgid[0];
                        req.weixin.media_id = content.mediaid[0];
                        req.weixin.thumb_media_id = content.thumbmediaid[0];
                        break;

                    case "location":
                        req.weixin.location_x = content.location_x[0];
                        req.weixin.location_y = content.location_y[0];
                        req.weixin.scale = content.scale[0];
                        req.weixin.label = content.label[0];
                        req.weixin.message_id = content.msgid[0];
                        break;

                    case "link":
                        req.weixin.title = content.title[0];
                        req.weixin.description = content.description[0];
                        req.weixin.url = content.url[0];
                        req.weixin.message_id = content.msgid[0];
                        break;

                    case "event":

                        req.weixin.event = content.event[0];

                        switch(req.weixin.event){

                            case "CLICK":
                                req.weixin.event_key = content.eventkey[0];
                                break;

                            case "VIEW":
                                req.weixin.event_key = content.eventkey[0];
                                break;

                            case "LOCATION":
                                req.weixin.latitude = content.latitude[0];
                                req.weixin.longitude = content.longitude[0];
                                req.weixin.precision = content.precision[0];
                                break;

                            case "unsubscribe":
                                break;

                            case "subscribe":
                                if(content.eventkey){
                                    req.weixin.event_key = content.eventkey[0];
                                }
                                if(content.ticket){
                                    req.weixin.ticket = content.ticket[0];
                                }
                                break;

                            case "SCAN":
                                req.weixin.event_key = content.eventkey[0];
                                req.weixin.ticket = content.ticket[0];
                                break;

                            default :
                                console.log("not recognized event");
                        }

                        break;

                    default :
                        console.log("not recognized message type");
                }

                console.log(req.weixin);

                next();
            });
        });
    };
};