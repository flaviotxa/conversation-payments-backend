import * as Yup from 'yup';
import Configuration from '../models/Configuration';

class ConfigurationsController {
  async store(req, res) {
    const schema = Yup.object().shape({
      provider: Yup.string().required(),
      providerAccountSid: Yup.string().required(),
      providerToken: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const {
      id,
      provider,
      providerAccountSid,
      providerToken,
    } = await Configuration.create(req.body);

    return res.json({
      id,
      provider,
      providerAccountSid,
      providerToken,
    });
  }

  async index(_req, res) {
    const configurations = await Configuration.find({});

    return res.json(configurations);
  }

  async single(req, res) {
    const { id } = req.params;

    const configuration = await Configuration.findOne({ _id: id });

    if (!configuration) {
      return res.status(404).json({ error: 'Form not found.' });
    }

    return res.json(configuration);
  }

  async delete(req, res) {
    const { id } = req.params;

    await Configuration.deleteOne({ _id: id }, error => {
      if (error) res.send(error);
    });

    return res.status(204).json();
  }
}

export default new ConfigurationsController();
