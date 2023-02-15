
const express = require('express')


const router = express.Router()

const { create, viewUsers, updateUser, deleteUser,createAdmin } = require('../controllers/users')
const authMiddleWere =require('../middlewere/auth')
// const adminMidleWere =require('../middlewere/adminAuth')

//cread users
router.post('/user', create)

//create admin 
router.post('/user/admin/:userId',authMiddleWere, createAdmin)

// users view 
router.get('/user/:id',authMiddleWere, viewUsers)

// Update users
router.put('/user/:id/:userId',authMiddleWere, updateUser)

//Delete user

router.delete('/user/:id/:userId',authMiddleWere, deleteUser)
module.exports = router