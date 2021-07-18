import Payment from '../models/Payment';
import sendTwilioMessage from '../utils/twilio';

class WebhookController {
  async create(req, res) {
    const event = req.body;

    const webhookObject = event.data.object;

    if (event.type === 'checkout.session.completed') {
      if (webhookObject.payment_status === 'paid') {
        try {
          const payment = await Payment.findOneAndUpdate(
            { stripeSessionId: webhookObject.id },
            { status: 'paid' },
            {
              new: true,
            }
          );

          await sendTwilioMessage(
            payment.conversationSid,
            `Dear Customer, your payment of ${payment.amount /
              100}$ regarding ${payment.description.toUpperCase()} has been successfully paid`
          );

          req.app.io.emit('paymentUpdated', payment);
        } catch (e) {
          return res.status(404).json({ error: 'Payment not found.' });
        }
      }
    }

    return res.status(200).json({ received: true });
  }
}

export default new WebhookController();
