var urllib = require("urllib");
var _ = require("underscore");

exports.getUserSummary = getUserSummary;
exports.getUserCumulate = getUserCumulate;
exports.getArticleSummary = getArticleSummary;
exports.getArticleTotal = getArticleTotal;
exports.getUserRead = getUserRead;
exports.getUserReadHour = getUserReadHour;
exports.getUserShare = getUserShare;
exports.getUserShareHour = getUserShareHour;
exports.getUpstreamMsg = getUpstreamMsg;
exports.getUpstreamMsgHour = getUpstreamMsgHour;
exports.getUpstreamMsgWeek = getUpstreamMsgWeek;
exports.getUpstreamMsgMonth = getUpstreamMsgMonth;
exports.getUpstreamMsgDist = getUpstreamMsgDist;
exports.getUpstreamMsgDistWeek = getUpstreamMsgDistWeek;
exports.getUpstreamMsgDistMonth = getUpstreamMsgDistMonth;
exports.getInterfaceSummary = getInterfaceSummary;
exports.getInterfaceSummaryHour = getInterfaceSummaryHour;



var StatisticURL = "https://api.weixin.qq.com/datacube/";


//http://mp.weixin.qq.com/wiki/3/ecfed6e1a0a03b5f35e5efac98e864b7.html
function getUserSummary(access_token, begin_date, end_date, callback){
//format YYYY-MM-DD
    var data = { 
    begin_date: begin_date, 
    end_date: end_date
};

    var url = StatisticURL + "getusersummary?access_token=" + access_token;

    var options = {
        method: "POST",
        dataType: "json",
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    urllib.request(url, options, function(err, body, resp){

        if(err){
            callback(err, null);
            return;
        }

        var error_code = body.errcode;
        var error_message = body.errmsg;
        callback(null,body);
    });
}

//http://mp.weixin.qq.com/wiki/3/ecfed6e1a0a03b5f35e5efac98e864b7.html
function getUserCumulate(access_token, begin_date, end_date, callback){
//format YYYY-MM-DD
    var data = { 
    begin_date: begin_date, 
    end_date: end_date
};

    var url = StatisticURL + "getusercumulate?access_token=" + access_token;

    var options = {
        method: "POST",
        dataType: "json",
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    urllib.request(url, options, function(err, body, resp){


        if(err){
            callback(err, null);
            return;
        }

        var error_code = body.errcode;
        var error_message = body.errmsg;
        callback(null,body);
    });
}




//http://mp.weixin.qq.com/wiki/8/c0453610fb5131d1fcb17b4e87c82050.html
function getArticleSummary(access_token, begin_date, end_date, callback){
//format YYYY-MM-DD
    var data = { 
    begin_date: begin_date, 
    end_date: end_date
};

    var url = StatisticURL + "getarticlesummary?access_token=" + access_token;

    var options = {
        method: "POST",
        dataType: "json",
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    urllib.request(url, options, function(err, body, resp){


        if(err){
            callback(err, null);
            return;
        }

        var error_code = body.errcode;
        var error_message = body.errmsg;
        callback(null,body);
    });
}

//http://mp.weixin.qq.com/wiki/8/c0453610fb5131d1fcb17b4e87c82050.html
function getArticleTotal(access_token, begin_date, end_date, callback){
//format YYYY-MM-DD
    var data = { 
    begin_date: begin_date, 
    end_date: end_date
};

    var url = StatisticURL + "getarticletotal?access_token=" + access_token;

    var options = {
        method: "POST",
        dataType: "json",
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    urllib.request(url, options, function(err, body, resp){


        if(err){
            callback(err, null);
            return;
        }

        var error_code = body.errcode;
        var error_message = body.errmsg;
        callback(null,body);
    });
}

//http://mp.weixin.qq.com/wiki/8/c0453610fb5131d1fcb17b4e87c82050.html
function getUserRead(access_token, begin_date, end_date, callback){
//format YYYY-MM-DD
    var data = { 
    begin_date: begin_date, 
    end_date: end_date
};

    var url = StatisticURL + "getuserread?access_token=" + access_token;

    var options = {
        method: "POST",
        dataType: "json",
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    urllib.request(url, options, function(err, body, resp){


        if(err){
            callback(err, null);
            return;
        }

        var error_code = body.errcode;
        var error_message = body.errmsg;
        callback(null,body);
    });
}

//http://mp.weixin.qq.com/wiki/8/c0453610fb5131d1fcb17b4e87c82050.html
function getUserReadHour(access_token, begin_date, end_date, callback){
//format YYYY-MM-DD
    var data = { 
    begin_date: begin_date, 
    end_date: end_date
};

    var url = StatisticURL + "getuserreadhour?access_token=" + access_token;

    var options = {
        method: "POST",
        dataType: "json",
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    urllib.request(url, options, function(err, body, resp){


        if(err){
            callback(err, null);
            return;
        }

        var error_code = body.errcode;
        var error_message = body.errmsg;
        callback(null,body);
    });
}

//http://mp.weixin.qq.com/wiki/8/c0453610fb5131d1fcb17b4e87c82050.html
function getUserShare(access_token, begin_date, end_date, callback){
//format YYYY-MM-DD
    var data = { 
    begin_date: begin_date, 
    end_date: end_date
};

    var url = StatisticURL + "getusershare?access_token=" + access_token;

    var options = {
        method: "POST",
        dataType: "json",
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    urllib.request(url, options, function(err, body, resp){


        if(err){
            callback(err, null);
            return;
        }

        var error_code = body.errcode;
        var error_message = body.errmsg;
        callback(null,body);
    });
}

//http://mp.weixin.qq.com/wiki/8/c0453610fb5131d1fcb17b4e87c82050.html
function getUserShareHour(access_token, begin_date, end_date, callback){
//format YYYY-MM-DD
    var data = { 
    begin_date: begin_date, 
    end_date: end_date
};

    var url = StatisticURL + "getusersharehour?access_token=" + access_token;

    var options = {
        method: "POST",
        dataType: "json",
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    urllib.request(url, options, function(err, body, resp){


        if(err){
            callback(err, null);
            return;
        }

        var error_code = body.errcode;
        var error_message = body.errmsg;
        callback(null,body);
    });
}















//http://mp.weixin.qq.com/wiki/12/32d42ad542f2e4fc8a8aa60e1bce9838.html
function getUpstreamMsg(access_token, begin_date, end_date, callback){
//format YYYY-MM-DD
    var data = { 
    begin_date: begin_date, 
    end_date: end_date
};

    var url = StatisticURL + "getupstreammsg?access_token=" + access_token;

    var options = {
        method: "POST",
        dataType: "json",
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    urllib.request(url, options, function(err, body, resp){


        if(err){
            callback(err, null);
            return;
        }

        var error_code = body.errcode;
        var error_message = body.errmsg;
        callback(null,body);
    });
}
//http://mp.weixin.qq.com/wiki/12/32d42ad542f2e4fc8a8aa60e1bce9838.html
function getUpstreamMsgHour(access_token, begin_date, end_date, callback){
//format YYYY-MM-DD
    var data = { 
    begin_date: begin_date, 
    end_date: end_date
};

    var url = StatisticURL + "getupstreammsghour?access_token=" + access_token;

    var options = {
        method: "POST",
        dataType: "json",
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    urllib.request(url, options, function(err, body, resp){


        if(err){
            callback(err, null);
            return;
        }

        var error_code = body.errcode;
        var error_message = body.errmsg;
        callback(null,body);
    });
}
//http://mp.weixin.qq.com/wiki/12/32d42ad542f2e4fc8a8aa60e1bce9838.html
function getUpstreamMsgWeek(access_token, begin_date, end_date, callback){
//format YYYY-MM-DD
    var data = { 
    begin_date: begin_date, 
    end_date: end_date
};

    var url = StatisticURL + "getupstreammsgweek?access_token=" + access_token;

    var options = {
        method: "POST",
        dataType: "json",
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    urllib.request(url, options, function(err, body, resp){


        if(err){
            callback(err, null);
            return;
        }

        var error_code = body.errcode;
        var error_message = body.errmsg;
        callback(null,body);
    });
}
//http://mp.weixin.qq.com/wiki/12/32d42ad542f2e4fc8a8aa60e1bce9838.html
function getUpstreamMsgMonth(access_token, begin_date, end_date, callback){
//format YYYY-MM-DD
    var data = { 
    begin_date: begin_date, 
    end_date: end_date
};

    var url = StatisticURL + "getupstreammsgmonth?access_token=" + access_token;

    var options = {
        method: "POST",
        dataType: "json",
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    urllib.request(url, options, function(err, body, resp){


        if(err){
            callback(err, null);
            return;
        }

        var error_code = body.errcode;
        var error_message = body.errmsg;
        callback(null,body);
    });
}
//http://mp.weixin.qq.com/wiki/12/32d42ad542f2e4fc8a8aa60e1bce9838.html
function getUpstreamMsgDist(access_token, begin_date, end_date, callback){
//format YYYY-MM-DD
    var data = { 
    begin_date: begin_date, 
    end_date: end_date
};

    var url = StatisticURL + "getupstreammsgdist?access_token=" + access_token;

    var options = {
        method: "POST",
        dataType: "json",
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    urllib.request(url, options, function(err, body, resp){


        if(err){
            callback(err, null);
            return;
        }

        var error_code = body.errcode;
        var error_message = body.errmsg;
        callback(null,body);
    });
}
//http://mp.weixin.qq.com/wiki/12/32d42ad542f2e4fc8a8aa60e1bce9838.html
function getUpstreamMsgDistWeek(access_token, begin_date, end_date, callback){
//format YYYY-MM-DD
    var data = { 
    begin_date: begin_date, 
    end_date: end_date
};

    var url = StatisticURL + "getupstreammsgdistweek?access_token=" + access_token;

    var options = {
        method: "POST",
        dataType: "json",
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    urllib.request(url, options, function(err, body, resp){


        if(err){
            callback(err, null);
            return;
        }

        var error_code = body.errcode;
        var error_message = body.errmsg;
        callback(null,body);
    });
}
//http://mp.weixin.qq.com/wiki/12/32d42ad542f2e4fc8a8aa60e1bce9838.html
function getUpstreamMsgDistMonth(access_token, begin_date, end_date, callback){
//format YYYY-MM-DD
    var data = { 
    begin_date: begin_date, 
    end_date: end_date
};

    var url = StatisticURL + "getupstreammsgdistmonth?access_token=" + access_token;

    var options = {
        method: "POST",
        dataType: "json",
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    urllib.request(url, options, function(err, body, resp){


        if(err){
            callback(err, null);
            return;
        }

        var error_code = body.errcode;
        var error_message = body.errmsg;
        callback(null,body);
    });
}


//http://mp.weixin.qq.com/wiki/8/30ed81ae38cf4f977194bf1a5db73668.html
function getInterfaceSummary(access_token, begin_date, end_date, callback){
//format YYYY-MM-DD
    var data = { 
    begin_date: begin_date, 
    end_date: end_date
};

    var url = StatisticURL + "getinterfacesummary?access_token=" + access_token;

    var options = {
        method: "POST",
        dataType: "json",
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    urllib.request(url, options, function(err, body, resp){


        if(err){
            callback(err, null);
            return;
        }

        var error_code = body.errcode;
        var error_message = body.errmsg;
        callback(null,body);
    });
}

//http://mp.weixin.qq.com/wiki/8/30ed81ae38cf4f977194bf1a5db73668.html
function getInterfaceSummaryHour(access_token, begin_date, end_date, callback){
//format YYYY-MM-DD
    var data = { 
    begin_date: begin_date, 
    end_date: end_date
};

    var url = StatisticURL + "getinterfacesummaryhour?access_token=" + access_token;

    var options = {
        method: "POST",
        dataType: "json",
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    urllib.request(url, options, function(err, body, resp){


        if(err){
            callback(err, null);
            return;
        }

        var error_code = body.errcode;
        var error_message = body.errmsg;
        callback(null,body);
    });
}




