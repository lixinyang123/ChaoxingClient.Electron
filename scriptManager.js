const request = require("request");

var url = "https://www.lllxy.net/cxsk/getscript.ashx";

function init(callback){
    request.get(url,(err,res,body)=>{
        callback(body);
    });
}

function getScript(callback){
    init((script)=>{
        callback(script);
    });
}

module.exports = {
    getScript
}