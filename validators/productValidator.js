const Joi = require('@hapi/joi')

const productSchema = Joi.object({
    name : Joi.string().min(3).max(50).required() , 
    price : Joi.number().positive().required() , 
    description : Joi.string().max(500)
})

module.exports = productSchema