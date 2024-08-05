const Product = require('../models/product')

const createProduct = async (req, res) => {
    const {name,price,description} = req.body
    try {
      const product = new Product({name,price,description});
      await product.save();
      res.status(201).send(product);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }


const getProduct =  async (req, res) => {
    try {
      const products = await Product.find({});
      res.status(200).send(products);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }


const updateProduct = async (req, res) => {
    const {name , price , description} = req.body
    try {
        const user = await Product.findByIdAndUpdate(req.params.id, {name,price,description} ,{ new: true, runValidators: true });
        if (!user) {
            return res.status(404).send();
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}


const deleteProduct = async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) {
        return res.status(404).send();
      }
      res.status(200).send(product);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  module.exports = {
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct
};
