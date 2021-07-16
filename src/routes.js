import { Router } from 'express';
import PaymentsController from './app/controllers/PaymentsController';
import ConfigurationsController from './app/controllers/ConfigurationsController';

const routes = new Router();

routes.post('/banana', (req, res) => {
  res.status(200).json({ ok: 'Validation fails.' });
});

routes.post('/payments', PaymentsController.create);

routes.post('/configurations', ConfigurationsController.store);
routes.get('/configurations', ConfigurationsController.index);
routes.get('/configurations/:id', ConfigurationsController.single);
routes.delete('/configurations/:id', ConfigurationsController.delete);

export default routes;
