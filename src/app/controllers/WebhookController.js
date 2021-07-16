import Payment from '../models/Payment';

class WebhookController {
  async create(req, res) {
    const event = req.body;

    const paymentIntent = event.data.object;
    if (event.type === 'payment_intent.succeeded') {
      try {
        await Payment.findOneAndUpdate(
          { stripeId: paymentIntent.id },
          { status: 'confirmed' }
        );
      } catch (e) {
        return res.status(404).json({ error: 'Payment not found.' });
      }
    }

    return res.status(200).json({ received: true });
  }
}

export default new WebhookController();
