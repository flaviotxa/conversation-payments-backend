import Payment from '../models/Payment';

class WebhookController {
  async create(req, res) {
    const event = req.body;

    const webhookObject = event.data.object;

    if (event.type === 'checkout.session.completed') {
      if (webhookObject.payment_status === 'paid') {
        try {
          await Payment.findOneAndUpdate(
            { stripeSessionId: webhookObject.id },
            { status: 'paid' }
          );
        } catch (e) {
          return res.status(404).json({ error: 'Payment not found.' });
        }
      }
    }

    return res.status(200).json({ received: true });
  }
}

export default new WebhookController();
