const User = require('../models/user.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const createUser = async (req, res) => {
    const {username,email,password} = req.body
    console.log(username,email,password)
    try {
       console.log(req.body)
        const user = new User({username,email,password});
        await user.save();
    
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

const loginUser = async(req,res) =>{
    const {email, password} = req.body 
    try{
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).send({message :'User not found'})
        }

        const isPasswordValid = await bcrypt.compare(password,user.password)
        if(!isPasswordValid){
            return res.status(401).send({message : 'Invalid Password'})
        }
        
        const token = jwt.sign({id: user._id, email: user.email},process.env.JWT_SECRET , {expiresIn : '12h'})
        res.status(200).send({message: 'Login Successful', token })
    }catch(error){
        res.status(500).send({error: error.message})
    }
}

const getUser =  async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

const updateUser =  async (req, res) => {
    const {username , email , password} = req.body
    try {
        const user = await User.findByIdAndUpdate(req.params.id,{username,email,password},{ new: true, runValidators: true });
        if (!user) {
            return res.status(404).send();
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

const deleteUser =  async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

module.exports = {
    createUser,
    loginUser , 
    getUser,
    updateUser,
    deleteUser
};
