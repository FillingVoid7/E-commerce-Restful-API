const express = require('express')
const Order = require('../models/order')
const router = express.Router()

router.post('/orders', async(req,res)=>{
    try{
        const order = new Order(req.body)
        await order.save()
        res.status(201).send(order)
    }catch(error){
        res.status(400).send(error)
    }
})


router.get('/orders' , async(req,res)=>{
    try{
        // replaces 'user' field in the order with its actual 'user' docs it references to |  (same for products.product)
        const orders = await Order.find({}).populate('user').populate('products.product')
        res.status(200).send(orders)
    }catch(error){
        res.status(500).send(error)
    }
})



router.patch('/orders/:id', async(req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['products' , 'totalAmount' , 'status']
    const isValidOperation = updates.every(update=>allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error:'Invalid updates'})
    }

    try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!order) {
      return res.status(404).send();
    }
    res.status(200).send(order);
  } catch (error) {
    res.status(400).send(error);
  }
});



router.delete('/orders/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).send();
    }
    res.status(200).send(order);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;