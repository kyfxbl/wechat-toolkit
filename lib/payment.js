var os = require('os');
var _ = require("underscore");
var urllib = require("urllib");
var parseString = require('xml2js').parseString;
var xml = require("xml");
var fs = require("fs");
var moment = require("moment");

var localIp;

(function resolveLocalIP(){

    var devs = os.networkInterfaces().en0 || os.networkInterfaces().eth0;
    var ipv4 = _.find(devs, function(item){
        return item.family === "IPv4";
    });

    localIp = ipv4 ? ipv4.address : "unknown";

})();

exports.cash_redpack = cash_redpack;

function cash_redpack(params, api_secret, p12_path, callback){

    fulfillParams();

    var sign = generateSignature();

    var content = assembleRequestFormat();

    doPost(function(err, body){

        if(err){
            callback(err);
            return;
        }

        var options = {
            async: true,
            explicitArray: true,
            normalize: true,
            normalizeTags: true,
            trim: true
        };

        parseString(body, options, function(err, message){

            if(err){
                callback(err);
                return;
            }

            var result = {
                return_code: message.xml.return_code[0],
                return_msg: message.xml.return_msg[0],
                result_code: message.xml.result_code[0],
                mch_billno: message.xml.mch_billno[0],
                mch_id: message.xml.mch_id[0],
                wxappid: message.xml.wxappid[0],
                re_openid: message.xml.re_openid[0],
                total_amount: message.xml.total_amount[0]
            };

            if(result.return_code === "SUCCESS"){
                result.send_listid = message.xml.send_listid[0];
                result.send_time = message.xml.send_time[0];
                callback(null, 0, result);
            }else{
                result.err_code = message.xml.err_code[0];
                result.err_code_des = message.xml.err_code_des[0];
                callback(null, 1, result);
            }
        });
    });

    function fulfillParams(){

        var date_str = moment().format("YYYYMMDD");
        var milli_seconds_str = new Date().getTime().toString().substr(3, 13);
        params.mch_billno = params.mch_id + date_str + milli_seconds_str;

        params.client_ip = localIp;
        params.min_value = params.total_amount;
        params.max_value = params.total_amount;
        params.total_num = 1;
        params.nonce_str = api_secret;
    }

    function generateSignature(){

        var sortedKeys = _.sortBy(_.keys(params), function(key){
            return key;
        });

        var keyAndValueStr = "";

        _.each(sortedKeys, function(key){
            keyAndValueStr += (key + "=" + params[key] + "&");
        });

        keyAndValueStr = keyAndValueStr + "key=" + api_secret;

        var md5 = require('crypto').createHash('md5');
        return md5.update(keyAndValueStr, 'utf8').digest('hex').toUpperCase();
    }

    function assembleRequestFormat(){

        var root = {
            xml: []
        };

        var allKeys = _.keys(params);

        _.each(allKeys, function(key){
            var obj = {};
            obj[key] = params[key];
            root.xml.push(obj);
        });

        root.xml.push({sign: sign});

        var response = [root];

        return xml(response);
    }

    function doPost(callback){

        fs.readFile(p12_path, function(err, p12){

            if(err){
                callback(err);
                return;
            }

            var url = "https://api.mch.weixin.qq.com/mmpaymkttransfers/sendredpack";

            var options = {
                method: "POST",
                data: content,
                dataType: "text",
                pfx: p12,
                passphrase: params.mch_id,
                agent: false
            };

            urllib.request(url, options, callback);
        });
    }
}