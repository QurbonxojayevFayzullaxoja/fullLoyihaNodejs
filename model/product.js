const mongoose = require("mongoose");

const maxsulotlar = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    prise: {
        type: String,
        required: true
    },
    creator_id: mongoose.Types.ObjectId

},
    {
        timestamps: true
    })

module.exports = mongoose.model("Products", maxsulotlar) 