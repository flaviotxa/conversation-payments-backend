require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async (
  unit_amount,
  description,
  currency,
  client_reference_id
) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency,
          product_data: {
            name: description,
          },
          unit_amount,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.SUCCESS_URL}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.CANCEL_URL}?session_id={CHECKOUT_SESSION_ID}`,
    client_reference_id,
  });

  return session;
};
