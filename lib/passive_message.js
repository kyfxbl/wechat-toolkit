var xml = require("xml");
var _ = require("underscore");

exports.replyTextMessage = replyTextMessage;
exports.replyNewsMessage = replyNewsMessage;

function replyTextMessage(req, res, message){

    var fan_open_id = req.weixin.fan_open_id;
    var my_open_id = req.weixin.my_open_id;

    var response = [];

    var root = {
        xml: []
    };
    root.xml.push({ToUserName: fan_open_id});
    root.xml.push({FromUserName: my_open_id});
    root.xml.push({CreateTime: new Date().getTime()});
    root.xml.push({MsgType: "text"});
    root.xml.push({Content: message});

    response.push(root);

    res.send(xml(response));
}

function replyNewsMessage(req, res, contents){

    if(contents.length === 0){
        console.log("contents shouldn't be empty");
        res.send("");
        return;
    }

    var fan_open_id = req.weixin.fan_open_id;
    var my_open_id = req.weixin.my_open_id;

    var response = [];
    var root = {
        xml: []
    };
    response.push(root);

    root.xml.push({ToUserName: fan_open_id});
    root.xml.push({FromUserName: my_open_id});
    root.xml.push({CreateTime: new Date().getTime()});
    root.xml.push({MsgType: "news"});
    root.xml.push({ArticleCount: contents.length});

    var articles = [];
    root.xml.push({Articles: articles});

    _.each(contents, function(content){

        var item = [];
        item.push({Title: content.title});
        if(content.desc){
            item.push({Description: content.desc});
        }
        if(content.picUrl){
            item.push({PicUrl: content.picUrl});
        }
        if(content.url){
            item.push({Url: content.url});
        }
        articles.push({item: item});
    });

    res.send(xml(response));
}