const userdb = require('../model/users')
const bcrypt = require('bcryptjs')

//Register 
const create = async (req, res) => {
    try {
        const { fullname, user_email, user_login, user_password } = req.body
        const isUser = await userdb.findOne({ user_login })
        if (isUser) {
            return res.json({ message: " bu akaunt egasi mavjud " })
        }

        const salt = bcrypt.genSaltSync(10)

        const hash = bcrypt.hashSync(user_password, salt)
        const db = new userdb({
            fullname, user_email, user_login, user_password: hash
        })
        await db.save()
            .then(data => res.json({ message: "malumot saqlandi", data }))
            .catch(err => console.log(err))
    } catch (err) {
        console.log(err)
    }
}
const createAdmin = async (req, res) => {
    try {
        const userId = req.params.userId;
        const isAdmin = await userdb.findOne({ _id: userId })
        if (!isAdmin.create || !isAdmin.admin) {
            return res.json({ message: "Sizni bunday huquqingiz yoq" })

        }

        const { fullname, user_email, user_login, user_rol, user_password, admin, create, deletee, update, read } = req.body
        const isUser = await userdb.findOne({ user_login })
        if (isUser) {
            return res.json({ message: " Bu akaunt egasi mavjud " })
        }

        const salt = bcrypt.genSaltSync(10)

        const hash = bcrypt.hashSync(user_password, salt)
        const db = new userdb({
            fullname, user_email, user_login, user_rol, user_password: hash, admin, create, deletee, update, read
        })
        await db.save()
            .then(data => res.json({ message: "malumot saqlandi", data }))
            .catch(err => console.log(err))
    } catch (err) {
        console.log(err)
    }
}

// userlani ko'rsatish qismi
const viewUsers = async (req, res) => {
    try {
        const userId = req.params.id;
        const isAdmin = await userdb.findOne({ _id: userId })
        if (!isAdmin.read || !isAdmin.admin) {
            return res.json({ message: "Sizni bunday huquqingiz yoq" })

        }
        userdb.find()
            .then(data => res.json(data))
            .catch(err => console.log(err))
    }
    catch (error) {
        console.log(error)
    }
}
//Update Users
const updateUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const isAdmin = await userdb.findOne({ _id: userId })

        if (!isAdmin.update || !isAdmin.admin) {
            return res.json({ message: "Sizni bunday huquqingiz yoq" })

        }
        const updataId = req.params.id;
        await userdb.updateOne({ _id: updataId }, { $set: req.body })
            .exec()
            .then(res.json({ message: "User malumotlari o'zsrtirildi" }))
            .catch(err => res.json({ message: err.message }))

    } catch (err) {
        console.log(err)
    }
}

//Delate users
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.userId;
    const isAdmin = await userdb.findOne({ _id: userId })

    if (!isAdmin.deletee || !isAdmin.admin) {
        return res.json({ message: "Sizni bunday huquqingiz yoq" })

    }
    const id = req.params.id
    await userdb.findByIdAndDelete({ _id: id })
        .then(res.json({ message: " Usre malumotlari uchirildi" }))
        .catch(err => console.log(err))
    } catch (err) {
        console.log(err);
    }
}

module.exports = { create, viewUsers, updateUser, deleteUser, createAdmin }