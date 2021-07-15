import express from 'express';
import routes from './routes';
import 'dotenv/config';
import './database';

const cors = require('cors');

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(
      express.json({
        type: '*/*', // optional, only if you want to be sure that everything is parset as JSON. Wouldn't reccomend
      })
    );
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
