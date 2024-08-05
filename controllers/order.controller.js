const Order = require('../models/order');

const createOrder = async (req, res) => {
    const { user, products, totalAmount, status } = req.body;
    try {
        const order = new Order({ user, products, totalAmount, status });
        await order.save();
        res.status(201).send(order);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

const getOrder = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user').populate('products.product');
        res.status(200).send(orders);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const updateOrder = async (req, res) => {
    const { user, products, totalAmount, status } = req.body;

    try {
        const order = await Order.findByIdAndUpdate(req.params.id,{ user, products, totalAmount, status },{ new: true, runValidators: true });
        if (!order) {
            return res.status(404).send()
        }
        res.status(200).send(order);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).send();
        }
        res.status(200).send(order);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

module.exports = {
    createOrder,
    getOrder,
    updateOrder,
    deleteOrder
};
