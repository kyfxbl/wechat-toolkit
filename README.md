wechat-toolkit
==============
#Features
微信公众平台开发SDK，用于node平台，需要配合express使用

当前实现以下特性：

1、middleware，解析微信服务器发来的请求。解析后，会在req上增加weixin对象，从中可以直接取到微信服务器发来的参数，比如req.weixin.fan_open_id

2、打开开发者模式。公众号启用开发者模式，需要和微信服务器做一次验证

3、验证消息来源，判断消息是否来自微信服务器

4、被动回复文字消息

5、被动回复图文消息

6、获取access_token

7、创建自定义菜单
#Install
npm install wechat-toolkit --save
#API
1、解析微信消息
<pre>
var wx = require("wechat-toolkit");

var app = express();
app.use(wx.xml_parser());
</pre>
<pre>
req.weixin.my_open_id
req.weixin.fan_open_id
req.weixin.message_time
req.weixin.message_type
req.weixin.message_id
req.weixin.content
req.weixin.event
req.weixin.event_key
</pre>

2、开启开发者模式
<pre>
var app = express();
app.get("/weixin/weixinInterface", wx.enable_dev_mode(token));// token在公众平台管理后台设置
</pre>

3、验证消息来源
<pre>
var flag = wx.validate(req, token);// true or false
</pre>

4、被动回复文字消息
<pre>
wx.replyTextMessage(req, res, "感谢您的关注");
</pre>

5、被动回复图文消息
<pre>
var item1 = {
            title: "标题1",
            desc: "描述1",
            picUrl: "http://xxx/1.png",
            url: "http://www.baidu.com"
        };

        var item2 = {
            title: "标题2",
            desc: "描述2",
            picUrl: "http://xxx/2.png",
            url: "http://www.baidu.com"
        };

        var contents = [item1, item2];

        wx.replyNewsMessage(req, res, contents);
</pre>

6、获取access_token
<pre>
wx.getAccessToken("app_id", "app_secret", function(err, access_token){

    if(err){
        console.log(err);
        return;
    }

    console.log(access_token);
});
</pre>

7、创建自定义菜单
<pre>
var obj = {
    "button" : [
        {
            "name" : "我要购买",
            "type" : "click",
            "key" : "BUY"
        },
        {
            "name" : "商务",
            "type" : "click",
            "key" : "BUSINESS"
        },
        {
            "name" : "关于",
            "sub_button" : [
                {
                    "name" : "官网",
                    "type" : "view",
                    "url" : "http://www.baidu.com/"
                },
                {
                    "name" : "团队介绍",
                    "type" : "click",
                    "key" : "ABOUT"
                }
            ]
        }
    ]
};

menus.createMenu(access_token, obj, function(err, error_code, error_message){

    if(err){
        console.log(err);
        return;
    }

    console.log(error_code);
    console.log(error_message)
});
</pre>
#FAQ
Q：为什么只有这么点接口

A：订阅号可调的接口很少。比如被动回复，只能回复纯文字和图文消息。像图片消息，音乐消息，由于接口中需要的MediaId，订阅号都无法获取，所以都无法实现。需要认证的服务号才能拥有这部分接口调用权限

我们现在主要是基于订阅号的能力开发，所以服务号的接口暂时没有。欢迎大家提PR。后续我们也会针对服务号开发，届时我也会补充

Q：使用的限制

A：本SDK基于express，为了方便依赖了express的中间件机制，以及req, res对象，所以需要配合express使用。如果你的web框架不是选型express，那么只能看一下源码，了解一下微信原生接口的参数格式了


