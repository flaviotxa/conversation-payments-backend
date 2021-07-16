import { Router } from 'express';
import PaymentsController from './app/controllers/PaymentsController';
import ConfigurationsController from './app/controllers/ConfigurationsController';
import WebhookController from './app/controllers/WebhookController';

const routes = new Router();

routes.post('/banana', (req, res) => {
  res.status(200).json({ ok: 'Validation fails.' });
});

routes.post('/payments', PaymentsController.create);
routes.get('/payments', PaymentsController.index);
routes.get('/payments/:id', PaymentsController.single);

routes.post('/configurations', ConfigurationsController.store);
routes.get('/configurations', ConfigurationsController.index);
routes.get('/configurations/:id', ConfigurationsController.single);
routes.delete('/configurations/:id', ConfigurationsController.delete);

routes.post('/webhook', WebhookController.create);

export default routes;
