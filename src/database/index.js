const mongoose = require('mongoose');

class Database {
  constructor() {
    this.mongo();
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb://localhost:27017/formhistory',
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
      }
    );
    const { connection } = mongoose;

    connection.once('open', () => {
      console.log('MongoDB: Database conectada com sucesso!');
    });
  }
}

module.exports = new Database();
