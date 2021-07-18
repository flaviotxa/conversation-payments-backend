import express from 'express';
import 'dotenv/config';
import './database';
import http from 'http';
import socketIo from 'socket.io';
import routes from './routes';

const cors = require('cors');

class App {
  constructor() {
    this.app = express();
    this.server = http.Server(this.app);
    this.io = socketIo(this.server, {
      cors: {
        origin: '*',
      },
    });
    this.app.io = this.io;

    this.middlewares();
    this.routes();
    this.sockets();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(
      express.json({
        type: '*/*', // optional, only if you want to be sure that everything is parset as JSON. Wouldn't reccomend
      })
    );
  }

  routes() {
    this.app.use(routes);
  }

  sockets() {
    this.io.on('connection', socket => {
      /* socket object may be used to send specific messages to the new connected client */
      console.log('new client connected');
      socket.emit('connection', null);
    });
  }
}

export default new App().server;
