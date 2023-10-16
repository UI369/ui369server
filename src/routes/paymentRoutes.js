const express = require('express');
const router = express.Router();

const stripe = require('stripe')('sk_test_qZRYpxvqiMTgESmzrZz1llKL00fbSvn5Wz');

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

router.post('/create-checkout-session', async (req, res) => {
  console.log('session');
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Draft League Registration',
          },
          unit_amount: 8000, // The price in cents
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'https://localhost:5173/payment/success',
    cancel_url: 'https://localhost:5173/payment/cancel',
  });
  console.log('session', session);
  res.json({ id: session.id });
});

router.post('/create-payment-intent', async (req, res) => {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: 'usd',
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

module.exports = router;
