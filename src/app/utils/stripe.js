import Configuration from '../models/Configuration';

const Stripe = require('stripe');

export default async (
  unit_amount,
  description,
  currency,
  client_reference_id
) => {
  const {
    providerSecretKey,
    successUrl,
    cancelUrl,
  } = await Configuration.findOne({
    provider: 'stripe',
  });

  const stripe = Stripe(providerSecretKey);
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
    success_url: `${successUrl}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${cancelUrl}?session_id={CHECKOUT_SESSION_ID}`,
    client_reference_id,
  });

  return session;
};
