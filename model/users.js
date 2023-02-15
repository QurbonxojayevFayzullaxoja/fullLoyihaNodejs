const mongoose = require('mongoose')

const user = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    user_email: {
        type: String,
        required: true
    },
    user_login: {
        type: String,
        required: true
    },
    user_rol: {
        type: String,
        default: "user"
    },
    user_password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    create: {
        type: Boolean,
        default: false
    },
    deletee: {
        type: Boolean,
        default: false
    },
    update: {
        type: Boolean,
        default: false
    },
    read: {
        type: Boolean,
        default: false
    },
    products: {
        type: Array,
        default: []
    }

},
    { timestamps: true }
)

module.exports = mongoose.model('users', user);