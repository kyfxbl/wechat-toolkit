var _ = require("underscore");
var urllib = require("urllib");

var localIp;

(function getLocalIP(){

    var os = require('os');

    var en0 = os.networkInterfaces().en0;
    var ipv4 = _.find(en0, function(item){
        return item.family === "IPv4";
    });

    localIp = ipv4.address;

})();

exports.cash_hongbao = cash_hongbao;

function cash_hongbao(params, api_secret){

    fulfillParams();

    var sign = generateSignature();

    var content = assembleRequestFormat();

    console.log(content);

    function fulfillParams(){

        var moment = require("moment");
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

        return md5.update(keyAndValueStr).digest('hex').toUpperCase();
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

        var xml = require("xml");
        return xml(response);
    }
}
