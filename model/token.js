const mongoose = require('mongoose')



const token = new mongoose.Schema({
    tokenId: String,
    userId: String,
})

module.exports = mongoose.model('Token', token)