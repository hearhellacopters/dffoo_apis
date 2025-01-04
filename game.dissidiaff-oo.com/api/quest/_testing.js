var fs = require('fs');
var field_names = require(__dirname + '/../../../game.g.dissidiaff-oo.com/api/quest/GL_mst_field_disp.json').Added;
var files = fs.readdirSync(__dirname + "/field/normal/");
const fields = [];
files.forEach(file=>{
    if(/.*\.json/.test(file)){
        const data = JSON.parse(fs.readFileSync(__dirname + "/field/normal/"+file));
        if(data.field_quest){
            data.field_quest.forEach(self=>{
                if( self.quest_type == 10 
                    //&& self.quest_list_group ==0 
                    //&& self.battle_info && self.battle_info.is_strong_enemy == 4
                    ){
                    const fild_id = file.replace(".json","");
                    const name = field_names[fild_id] && field_names[fild_id].name;
                    fields.push(`Field #${fild_id} ${name} - Quest: ${self.name} is_strong_enemy ${self.battle_info && self.battle_info.is_strong_enemy}`);
                }
            })
        }
    }
})
console.log(fields.join("\n"));
