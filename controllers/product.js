const productdb = require('../model/product')
const userdb = require('../model/users')



//get all products
const readAll = (req, res) => {
    productdb.find()
        .exec()
        .then(data => res.json(data))
        .catch(err => res.json({ message: err.message }))


}

// Maxsulot qo'shish

const addProduct = async (req, res) => {
    try {
        const createrId = req.params.id;
        const isUser = await userdb.findOne({ _id: createrId })
        if (!isUser.create) {
            return res.json({ message: "Siz post qo'sha olmaysiz" })
        }
        const { title, comment, country, prise } = req.body;
        const db = new productdb({
            title, comment, country, prise,creator_id:createrId
        })
        await db.save()
            .then(data => res.json({ message: "malumot saqlandi", data }))
            .catch(err => console.log(err))
    } catch (err) {
        console.log(err)
    }
}
// Update product

const updata = async (req, res) => {
    try {
        const userId = req.params.userId;
    const isAdmin = await userdb.findOne({ _id: userId })

    if (!isAdmin.update ) {
        return res.json({ message: "Sizni bunday huquqingiz yoq" })

    }
    const updataId = req.params.id;
    await productdb.updateOne({ _id: updataId }, { $set: req.body })
        .exec()
        .then(data => res.json({ data, message: "barakalla" }))
        .catch(err => res.json(err))
    } catch (err) {
        console.log(err);
    }
}

// Delete product

const deleteProduct = async (req, res) => {
    try {
        const userId = req.params.userId;
        const isAdmin = await userdb.findOne({ _id: userId })
    
        if (!isAdmin.deletee ) {
            return res.json({ message: "Sizni bunday huquqingiz yoq" })
    
        }
        const deleteId = req.params.id;
        await productdb.findByIdAndDelete({ _id: deleteId })
            .then(res.json({ message: "malumot uchirildi" }))
            .catch(err => console.log(err))
    } catch (err) {
        console.log(err)
    }
}
module.exports = { readAll, addProduct, updata, deleteProduct }

