import * as Yup from 'yup';
import { BitlyClient } from 'bitly';
import Payment from '../models/Payment';
import getPaymentCheckoutUrl from '../utils/stripe';
import sendTwilioMessage from '../utils/twilio';

require('dotenv').config();

console.log(process.env.BITLY_TOKEN);

const bitly = new BitlyClient(process.env.BITLY_TOKEN);

class PaymentsController {
  async create(req, res) {
    const schema = Yup.object().shape({
      amount: Yup.number().required(),
      description: Yup.string().required(),
      currency: Yup.string().required(),
      conversationSid: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const {
      id,
      amount,
      description,
      currency,
      conversationSid,
    } = await Payment.create(req.body);

    const { id: stripeSessionId, url } = await getPaymentCheckoutUrl(
      amount,
      description,
      currency,
      id
    );

    const payment = await Payment.findOneAndUpdate(
      { _id: id },
      { url, stripeSessionId },
      { new: true }
    );

    async function getShortUrl(u) {
      const response = await bitly.shorten(u);
      console.log(`Your shortened bitlink is ${response.link}`);
      return response.link;
    }

    const shortUrl = await getShortUrl(url);

    await sendTwilioMessage(
      conversationSid,
      `Dear Customer, please access the following link to complete your payment of ${amount /
        100}$ regarding ${description.toUpperCase()}: ${shortUrl}`
    );

    req.app.io.emit('paymentCreated', {
      _id: payment.id,
      description: payment.description,
      status: payment.status,
      amount: payment.amount / 100,
      currency: payment.currency,
    });

    return res.json({
      id,
      amount,
      description,
      currency,
      conversationSid,
      url,
    });
  }

  async index(req, res) {
    const { conversationSid } = req.query;
    const payments = await Payment.find({ conversationSid });

    return res.json(
      payments.map(p => Object.assign(p, { amount: p.amount / 100 }))
    );
  }

  async single(req, res) {
    const { id } = req.params;

    let payment;

    try {
      payment = await Payment.findOne({ _id: id });
    } catch (e) {
      return res.status(404).json({ error: 'Payment not found.' });
    }

    if (!payment) {
      return res.status(404).json({ error: 'Payment not found.' });
    }

    return res.json(payment);
  }
}

export default new PaymentsController();
