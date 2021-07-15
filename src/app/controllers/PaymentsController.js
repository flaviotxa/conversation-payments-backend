import * as Yup from 'yup';
import Payment from '../models/Payment';

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

    return res.json({ id, amount, description, currency, conversationSid });
  }
}

export default new PaymentsController();
