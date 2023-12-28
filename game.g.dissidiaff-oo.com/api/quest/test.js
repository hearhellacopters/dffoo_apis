const fs = require('fs');
const file = JSON.parse(fs.readFileSync('./game.g.dissidiaff-oo.com/api/quest/field/quest_id_by_field.json'));
const normal = file.normal
const hard = file.hard
const errors = {}
for (const key in normal) {
    normal[key].forEach(num => {
        try {
            //check if you have a file, if so continue
            fs.readFileSync('./game.g.dissidiaff-oo.com/api/quest/quest_start/normal/' + num + '.json');
        } catch (error) {
            //didnt find file
            try {
                //reads field
                const data = fs.readFileSync('./game.g.dissidiaff-oo.com/api/quest/field/normal/' + key + '.json')
                const json_data = JSON.parse(data).field_quest
                const filtered = json_data.filter(self=>self.quest_id == num)
                if(filtered.length != 0){
                    if( filtered[0].before_talk == -1 &&
                        filtered[0].quest_list_group == 0
                        ){
                        console.log("quest_id "+num+" in "+key+ " missing")
                        if(errors[key] == undefined){
                            Object.assign(errors,{[key]:[]})
                        }
                        errors[key].push(num)
                    }
                }
            } catch (error) {
                console.log("Couldnt find field data for " + num);
            }
            
        }
    });
}
fs.writeFileSync('./game.g.dissidiaff-oo.com/api/quest/gl_needed.json',JSON.stringify(errors,null,4))
console.log(errors);