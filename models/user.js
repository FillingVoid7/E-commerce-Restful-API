const mongoose = require('mongoose')
const bcrpyt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username :{
        type :String , 
        required:true , 
        unique : true , 
    },
    email:{
        type : String , 
        required:true , 
        unique: true,
    },
    password:{
        type:String , 
        required:true ,
    },
})

//Bcrpyting using middleware

userSchema.pre('save' , async function(next){
    if(this.isModified('password') || this.isNew){
        const saltRounds = 10 
        this.password = await bcrpyt.hash(this.password , saltRounds)
    }
    next()
})

const User = mongoose.model('User',userSchema)
module.exports = User 

