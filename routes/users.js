const express = require('express');
const {
    createUser,
    getUser,
    updateUser,
    deleteUser
} = require('../controllers/user.controller');
const router = express.Router();

router.post('/',createUser);
router.get('/',getUser);
router.patch('/:id',updateUser);
router.delete('/:id',deleteUser);

module.exports = router;
