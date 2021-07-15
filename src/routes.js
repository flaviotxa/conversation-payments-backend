import { Router } from 'express';

const routes = new Router();

routes.get('/banana', (req,res)=>{ res.status(200).json({ ok: 'Validation fails.' })});

export default routes;