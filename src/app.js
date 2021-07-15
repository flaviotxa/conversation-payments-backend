import express from 'express';

import routes from './routes';

const cors = require('cors');

class App {
    constructor() {
        this.server = express();

        this.routes();
        this.middlewares(); 
      }
      
      middlewares() {
        this.server.use(express.json());
        this.server.use(cors());
      }

      routes() {
        this.server.use(routes);
      }
}

export default new App().server;