const express = require('express');
const { createUser, getUser,updateUser,deleteUser} = require('../controllers/user.controller');
const router = express.Router();
const validate = require('../middleware/validate')
const userSchema = require('../validators/userValidator')

router.post('/',validate(userSchema),createUser);
router.get('/',getUser);
router.patch('/:id',validate(userSchema),updateUser);
router.delete('/:id',deleteUser);

module.exports = router;
