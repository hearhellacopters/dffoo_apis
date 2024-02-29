var fs = require('fs');
var files = fs.readdirSync(__dirname);
files.forEach(file=>{
    if(/.*\.json/.test(file)){
        const data = JSON.parse(fs.readFileSync(__dirname + "/"+file));
        delete data.behavior_code;
        delete data.nonce;
        delete data.status_code;
        delete data.verup_code;
        fs.writeFileSync(__dirname + "/"+file, JSON.stringify(data, null, 4));
    }
})