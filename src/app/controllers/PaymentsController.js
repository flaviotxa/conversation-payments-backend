import * as Yup from 'yup';
import Payment from '../models/Payment';
import getPaymentCheckoutUrl from '../utils/stripe';

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

    await Payment.findOneAndUpdate({ _id: id }, { url, stripeSessionId });

    return res.json({
      id,
      amount,
      description,
      currency,
      conversationSid,
      url,
    });
  }

  async index(_req, res) {
    const payments = await Payment.find({});

    return res.json(payments);
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
