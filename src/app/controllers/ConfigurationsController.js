import * as Yup from 'yup';
import Configuration from '../models/Configuration';

class ConfigurationsController {
  async store(req, res) {
    const schema = Yup.object().shape({
      provider: Yup.string().required(),
      providerKey: Yup.string().required(),
      providerSecretKey: Yup.string().required(),
      successUrl: Yup.string().required(),
      cancelUrl: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const {
      id,
      provider,
      providerKey,
      providerSecretKey,
      successUrl,
      cancelUrl,
    } = await Configuration.create(req.body);

    return res.json({
      id,
      provider,
      providerKey,
      providerSecretKey,
      successUrl,
      cancelUrl,
    });
  }

  async index(_req, res) {
    const configurations = await Configuration.find({});

    return res.json(configurations);
  }

  async single(req, res) {
    const { id } = req.params;

    let configuration;

    try {
      configuration = await Configuration.findOne({ _id: id });
    } catch (e) {
      return res.status(404).json({ error: 'Configuration not found.' });
    }
    if (!configuration) {
      return res.status(404).json({ error: 'Configuration not found.' });
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
