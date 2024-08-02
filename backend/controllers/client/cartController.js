import { mongo } from "mongoose"

import CARDS from "../../models/cardsModel.js"

class cartController {

    static get_card_products = async (req, res) => {
        try {
            const co = 5;
            const { userId } = req.params

            const card_products = await CARDS.aggregate([{
                $match: {
                    userId: {
                        $eq: new mongo.ObjectId(userId)
                    }
                }
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'productId',
                    foreignField: "_id",
                    as: 'products'
                }
            }])

            let buy_product_item = 0
            let calculatePrice = 0;
            let card_product_count = 0;
            const outOfStockProduct = card_products.filter(p => p.products[0].stock < p.quantity)
            for (let i = 0; i < outOfStockProduct.length; i++) {
                card_product_count = card_product_count + outOfStockProduct[i].quantity
            }

            const stockProduct = card_products.filter(p => p.products[0].stock >= p.quantity)
            for (let i = 0; i < stockProduct.length; i++) {
                const {
                    quantity
                } = stockProduct[i]
                card_product_count = card_product_count + quantity
                buy_product_item = buy_product_item + quantity
                const {
                    price,
                    discount
                } = stockProduct[i].products[0]
                if (discount !== 0) {
                    calculatePrice = calculatePrice + quantity * (price - Math.floor((price * discount) / 100))
                } else {
                    calculatePrice = calculatePrice + quantity * price
                }
            }

            let p = []
            let unique = [...new Set(stockProduct.map(p => p.products[0].sellerId.toString()))]
            for (let i = 0; i < unique.length; i++) {
                let price = 0;
                for (let j = 0; j < stockProduct.length; j++) {
                    const tempProduct = stockProduct[j].products[0]
                    if (unique[i] === tempProduct.sellerId.toString()) {
                        let pri = 0;
                        if (tempProduct.discount !== 0) {
                            pri = tempProduct.price - Math.floor((tempProduct.price * tempProduct.discount) / 100)
                        } else {
                            pri = tempProduct.price
                        }
                        pri = pri - Math.floor((pri * co) / 100)
                        price = price + pri * stockProduct[j].quantity
                        p[i] = {
                            sellerId: unique[i],
                            shopName: tempProduct.shopName,
                            price,
                            products: p[i] ? [
                                ...p[i].products,
                                {
                                    _id: stockProduct[j]._id,
                                    quantity: stockProduct[j].quantity,
                                    productInfo: tempProduct
                                }
                            ] : [{
                                _id: stockProduct[j]._id,
                                quantity: stockProduct[j].quantity,
                                productInfo: tempProduct

                            }]
                        }
                    }

                }
            }

            return res.status(200).json({
                card_products: p,
                price: calculatePrice,
                card_product_count,
                shipping_fee: 85 * p.length,
                outOfStockProduct,
                buy_product_item
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error })
        }
    }

    static get_wishlist = async (req, res) => {

    }

    static add_to_cart = async (req, res) => {
        try {
            const { userId, productId, quantity } = req.body

            const product = await CARDS.findOne({
                $and: [{
                    productId: {
                        $eq: productId
                    }
                },
                {
                    userId: {
                        $eq: userId
                    }
                }
                ]
            })

            if (product) {
                return res.status(400).json({ error: 'Product already added to card' })
            }

            const newProduct = await CARDS.create({
                userId,
                productId,
                quantity
            })

            return res.status(200).json({
                message: 'Add to card success',
                newProduct
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error })
        }
    }

    static add_wishlist = async (req, res) => {

    }

    static quantity_inc = async (req, res) => {
        try {
            const { card_id } = req.params

            const product = await CARDS.findById(card_id)
            const {
                quantity
            } = product

            await CARDS.findByIdAndUpdate(card_id, {
                quantity: quantity + 1
            })
            res.status(200).json({
                message: 'success'
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error })
        }
    }

    static quantity_dec = async (req, res) => {
        const { card_id } = req.params
        try {
            const product = await CARDS.findById(card_id)
            const {
                quantity
            } = product
            await CARDS.findByIdAndUpdate(card_id, {
                quantity: quantity - 1
            })
            res.status(200).json({
                message: 'success'
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error })
        }
    }

    static delete_card_product = async (req, res) => {
        try {
            const { card_id } = req.params

            await CARDS.findByIdAndDelete(card_id)

            res.status(200).json({
                message: 'success'
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error })
        }
    }

    static delete_wishlist = async (req, res) => {

    }

}

export default cartController