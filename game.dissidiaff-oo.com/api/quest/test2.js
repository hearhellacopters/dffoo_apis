const fs = require('fs');
const id = 1798;
const file = JSON.parse(fs.readFileSync(`./game.dissidiaff-oo.com/api/quest/field/normal/${id}.json`));
const quests = []
file.field_quest.forEach(num => {
    try {
        //check if you have a file, if so continue
        fs.readFileSync('./game.dissidiaff-oo.com/api/quest/quest_start/normal/' + num.quest_id + '.json');
    } catch (error) {
        //didnt find file
        try {
            quests.push(num.quest_id);
        } catch (error) {
            //nothing
        }

    }
});

fs.writeFileSync('./game.dissidiaff-oo.com/api/quest/jp_needed_normal.txt', quests.join("\n"))