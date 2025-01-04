var fs = require('fs');
var field_names = require('./JP_mst_field_disp.json').Added;
var files = fs.readdirSync(__dirname + "/field/normal/");
const fields = {};
files.forEach(file=>{
    if(/.*\.json/.test(file)){
        const data = JSON.parse(fs.readFileSync(__dirname + "/field/normal/"+file));
        var read = false;
        if(data.field_quest){
            data.field_quest.forEach(self=>{
                if(self.quest_id && read != true){
                    try {
                        const data2 = JSON.parse(fs.readFileSync(__dirname + "/quest_start/normal/"+self.quest_id+".json"));
                        if(data2.event_id != undefined && data2.event_id != 0){
                            const field = file.replace(".json","");
                            const name = field_names[field] && field_names[field].name
                            if(name == undefined){
                                console.log(`Unknown field of ${field} of event_id ${data2.event_id}`);
                            } else {
                                if(fields[data2.event_id]){
                                    if(!(fields[data2.event_id] == (`${field} - ` + name))){
                                        console.log(`Different name on ${data2.event_id} w/ ${fields[data2.event_id]} not ${name}`)
                                    }
                                } else {
                                    fields[data2.event_id] = `${field} - ` + name;
                                }
                            }
                            //read = true;
                        }
                    } catch (error) {
                        
                    }
                }
            })
        }
    }
})
console.log(JSON.stringify(fields,null,4));
fs.writeFileSync(__dirname + "/_events.json",JSON.stringify(fields,null,4));
