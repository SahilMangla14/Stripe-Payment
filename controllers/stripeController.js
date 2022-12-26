const stripe = require('stripe')(process.env.STRIPE_KEY)

const stripeController = async (req,res) => {
    const { purchase, total_amount, shipping_fee } = req.body

    const calculateOlderAmount = () => {
        return total_amount + shipping_fee
    }

    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOlderAmount(),
        currency: 'usd',
    })

    res.json({clientSecret:paymentIntent.client_secret })

}

module.exports = stripeController