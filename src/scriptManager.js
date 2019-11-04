const request = require("request");
const fs = require("fs");

var url = "https://www.lllxy.net/cxsk/getscript.ashx";

function init(callback){
    request.get(url,(err,res,body)=>{
        if(err){
            fs.readFile("../assets/Script.js",(err,data)=>{
                callback(data.toString());
            });
        }
        else{
            callback(body);
        }
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