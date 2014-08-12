var xml = require("xml");
var _ = require("underscore");

exports.assembleTextMessage = assembleTextMessage;
exports.assembleNewsMessage = assembleNewsMessage;

function assembleTextMessage(res, fan_open_id, my_open_id, message){

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

function assembleNewsMessage(res, fan_open_id, my_open_id, contents){

    if(contents.length === 0){
        console.log("contents shouldn't be empty");
        res.send("");
        return;
    }

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
        item.push({Description: content.desc});
        item.push({PicUrl: content.picUrl});
        item.push({Url: content.url});
        articles.push({item: item});
    });

    res.send(xml(response));
}