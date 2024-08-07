const express = require('express');
const { createUser, getUser,updateUser,deleteUser , loginUser} = require('../controllers/user.controller');
const router = express.Router();
const validate = require('../middleware/validate')
const userSchema = require('../validators/userValidator')

router.post('/',validate(userSchema),createUser);
router.post('/login',loginUser)
router.get('/',getUser);
router.patch('/:id',validate(userSchema),updateUser);
router.delete('/:id',deleteUser);

module.exports = router;
