const request = require("request");
const fs = require("fs");

var url = "https://www.lllxy.net/cxsk/getscript.ashx";

function init(callback){
    request.get(url,(err,res,body)=>{
        callback(body);
    });
}

function getScript(callback){
    fs.readFile("./script.js",(err,data)=>{
        if(!err){
            console.log("CustomScript");
            callback(data.toString());
        }
        else{
            console.log("OnlineScript");
            init((script)=>{
                callback(script);
            });
        }
    });
}

module.exports = {
    getScript
}