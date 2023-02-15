const express = require('express')
const router = express.Router()
const productdb =require('../model/product');
const userdb= require('../model/users')
const { readAll, addProduct, updata, deleteProduct } = require('../controllers/product')
const authMiddleWere = require('../middlewere/auth')

//hamma maxsulotlar
router.get('/product', readAll);

//maxsulot qo'shish
router.post('/product/:id', authMiddleWere,addProduct )

//maxsulotlarni o'zgartirish 

router.put('/product/:id/:userId', authMiddleWere, updata)

//maxsulotni uchirish
router.delete('/product/:id/:userId', authMiddleWere, deleteProduct)




module.exports = router;