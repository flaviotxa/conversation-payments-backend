import { Router } from 'express';
import PaymentsController from './app/controllers/PaymentsController';

const routes = new Router();

routes.post('/banana', (req, res) => {
  res.status(200).json({ ok: 'Validation fails.' });
});

routes.post('/payments', PaymentsController.create);

export default routes;
