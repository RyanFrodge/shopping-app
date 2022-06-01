const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let item = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    quantity: {
        type: Number
    },
    purchased: {
        type: Boolean
    }
});

module.exports = mongoose.model("item", item);
