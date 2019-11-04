const request = require("request");
const fs = require("fs");

var url = "https://www.lllxy.net/cxsk/getscript.ashx";

function init(callback){
    request.get(url,(err,res,body)=>{
        if(err){
            console.log("LocalScript");
            fs.readFile("./assets/Script.js",(err,data)=>{
                callback(data.toString());
            });
        }
        else{
            console.log("OnlineScript");
            fs.writeFile("./assets/Script.js",body,(err)=>{});
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