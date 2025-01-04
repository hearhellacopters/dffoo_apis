var fs = require('fs');
var field_names = require('./GL_mst_field_disp.json').Added;
var files = fs.readdirSync(__dirname + "/field/hard/");
const fields = {};
const is_strong_enemy = {
    0: "Normal",
    1: "Boss",
    2: "CHAOS/COSMOS",
    3: "LUFENIA",
    4: "LUFENIA+",
    5: "SHINYRU",
    6: "SHINYRU-Spiritus",
    7: "Re-SHINYRU",
}
files.forEach(file=>{
    if(/.*\.json/.test(file)){
        const data = JSON.parse(fs.readFileSync(__dirname + "/field/hard/"+file));
        if(data.field_quest){
            data.field_quest.forEach(self=>{
                if(self.name != "0" && self.before_talk == -1){
                    const field = parseInt(file.replace(".json",""));
                    if(!(self.quest_type == 2 || self.quest_type == 3|| self.quest_type == 12)){
                        fields[self.quest_id] = {
                            quest_id: self.quest_id,
                            name: `${self.name}${self.battle_info ? ` Lv${self.battle_info.difficulty}` : ""}${self.battle_info ? ` - ${is_strong_enemy[self.battle_info.is_strong_enemy]}` : ""}`,
                            field_id: field
                        }
                    }
                    
                }
            })
        }
    }
})
console.log(JSON.stringify(fields,null,4));
fs.writeFileSync(__dirname + "/quest_names_hard.json",JSON.stringify(fields,null,4));
