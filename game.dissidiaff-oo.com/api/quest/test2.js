const fs = require('fs');
const file = JSON.parse(fs.readFileSync('./game.dissidiaff-oo.com/api/quest/field/quest_id_by_field.json'));
const field_names = JSON.parse(fs.readFileSync('./game.dissidiaff-oo.com/api/quest/JP_mst_field_disp.json')).Added;
const normal = file.normal
const hard = file.hard
const jp_missing = [];
const gl_subs = [];

//change this
const run_mode = "normal"

/**
 * Check if a file exist
 * 
 * @param {String} filePath - Path to file to check
 * @returns {Boolean}
 */
function file_exists(filePath) {
    try {
        fs.accessSync(filePath, fs.constants.F_OK);
        return true;  // File exists
    } catch (error) {
        if (error.code === 'ENOENT') {
            return false;  // File does not exist
        } else {
            throw error;  // Other errors
        }
    }
};

const mode = run_mode == "normal" ? normal : hard

for (const field in mode) {
    mode[field].forEach(num => {
        //check if we have the JP file, if so, nothing.
        if(!file_exists(`./game.dissidiaff-oo.com/api/quest/quest_start/${run_mode}/` + num + '.json')){
            //we dont have jp, lets try GL
            if(!file_exists(`./game.g.dissidiaff-oo.com/api/quest/quest_start/${run_mode}/` + num + '.json')){
                //don't have either
                try {
                    //reads field to get name of quest for logging
                    const data = fs.readFileSync(`./game.dissidiaff-oo.com/api/quest/field/${run_mode}/` + field + '.json')
                    const json_data = JSON.parse(data).field_quest;
                    const filtered = json_data.filter(self => self.quest_id == num);
                    if (filtered.length != 0) {
                        if (filtered[0].battle_info != undefined
                        ) {
                            const field_name = field_names[field] && field_names[field].name;
                            const quest_name = filtered[0].name
                            const str = `${field_name} #${field} - ${quest_name} #${num}`
                            jp_missing.push(str)
                        }
                    }
                } catch (error) {
                    console.log(`Couldnt find JP field ${field} for quest_id #` + num);
                    //console.log(error)
                }
            } else {
                //just dont have jp
                try {
                    //reads field to get name of quest for logging
                    const data = fs.readFileSync(`./game.g.dissidiaff-oo.com/api/quest/field/${run_mode}/` + field + '.json')
                    const json_data = JSON.parse(data).field_quest;
                    const filtered = json_data.filter(self => self.quest_id == num);
                    if (filtered.length != 0) {
                        if (filtered[0].battle_info != undefined
                        ) {
                            const field_name = field_names[field] && field_names[field].name;
                            const quest_name = filtered[0].name
                            const str = `${field_name} #${field} - ${quest_name} #${num}`
                            gl_subs.push(str)
                        }
                    }
                } catch (error) {
                    console.log(`Couldnt find JP field ${field} for quest_id #` + num);
                    //console.log(error)
                }
            }
        }
    });
}
fs.writeFileSync(`./game.dissidiaff-oo.com/api/quest/gl_sub_${run_mode}.txt`, gl_subs.join("\n"))
fs.writeFileSync(`./game.dissidiaff-oo.com/api/quest/jp_needed_${run_mode}.txt`, jp_missing.join("\n"))