const fs = require('fs');
const file = JSON.parse(fs.readFileSync('./game.g.dissidiaff-oo.com/api/quest/field/quest_id_by_field.json'));
const field_names = JSON.parse(fs.readFileSync('./game.g.dissidiaff-oo.com/api/quest/GL_mst_field_disp.json')).Added;
const normal = file.normal
const hard = file.hard
const errors = []
for (const field in normal) {
    normal[field].forEach(num => {
        try {
            //check if you have a file, if so continue
            fs.readFileSync('./game.g.dissidiaff-oo.com/api/quest/quest_start/normal/' + num + '.json');
        } catch (error) {
            //didnt find file
            try {
                //reads field
                const data = fs.readFileSync('./game.g.dissidiaff-oo.com/api/quest/field/normal/' + field + '.json')
                const json_data = JSON.parse(data).field_quest
                const filtered = json_data.filter(self => self.quest_id == num)
                if (filtered.length != 0) {
                    if (filtered[0].battle_info != undefined
                    ) {
                        const field_name = field_names[field] && field_names[field].name;
                        const quest_name = filtered[0].name
                        const str = `${field_name} #${field} - ${quest_name} #${num}`
                        errors.push(str)
                    }
                }
            } catch (error) {
                console.log("Couldnt find quest data for " + num + " in field " + field);
                console.log(error)
            }

        }
    });
}
fs.writeFileSync('./game.g.dissidiaff-oo.com/api/quest/gl_needed_normal.txt', errors.join("\n"))