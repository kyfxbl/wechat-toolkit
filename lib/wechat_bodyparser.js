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

                req.weixin.my_open_id = content.tousername[0];
                req.weixin.fan_open_id = content.fromusername[0];
                req.weixin.message_time = Number(content.createtime[0]);
                req.weixin.message_type = content.msgtype[0];

                if(req.weixin.message_type === "text"){
                    req.weixin.message_id = content.msgid[0];
                    req.weixin.content = content.content[0];
                }else if(req.weixin.message_type === "event"){
                    req.weixin.event = content.event[0];
                    if(req.weixin.event === "CLICK" || req.weixin.event === "VIEW"){
                        req.weixin.event_key = content.eventkey[0];
                    }
                }else if(req.weixin.message_type === "voice"){
                    req.weixin.message_id = content.msgid[0];
                    req.weixin.format = content.format[0];
                    req.weixin.media_id = content.mediaid[0];
                    req.weixin.recognition = content.recognition[0];
                }

                console.log(req.weixin);

                next();
            });
        });
    };
};