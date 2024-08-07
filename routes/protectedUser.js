const express = require('express')
const authenticateToken = require('../middleware/auth')
const router = express.Router()

router.get('/', authenticateToken , (req,res)=>{
    res.status(200).json({message: `Welcome , user ${req.user.id}`})
})

module.exports = router