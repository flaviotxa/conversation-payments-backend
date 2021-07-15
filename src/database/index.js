import mongoose from 'mongoose';

class Database {
  constructor() {
    this.mongo();
  }

  mongo() {
    this.mongoConnection = mongoose
      .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
      })
      .then(x => {
        // eslint-disable-next-line no-console
        console.log(
          `Connected to Mongo! Database name: "${x.connections[0].name}"`
        );
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.error('Error connecting to mongo', err);
      });
  }
}

export default new Database();
