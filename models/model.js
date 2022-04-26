const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const storeSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
});
const Cat = mongoose.model('Cat', storeSchema);

module.exports = {Cat}