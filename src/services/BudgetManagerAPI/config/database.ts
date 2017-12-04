import * as mongoose from "mongoose";
import * as config from "./index";
import * as Models from "./../app/model/user";

export default (mongoose: mongoose.Mongoose) => {
  const database = mongoose.connection;
  mongoose.Promise = Promise;
  mongoose.connect(config.database, {
    useMongoClient: true,
    promiseLibrary: global.Promise
  });
  database.on('error', error => console.log(`Connection to BudgetManager database failed: ${error}`));
  database.on('connected', () => console.log('Connected to BudgetManager database'));
  database.on('disconnected', () => console.log('Disconnected from BudgetManager database'));
  process.on('SIGINT', () => {
    database.close(() => {
      console.log('BudgetManager terminated, connection closed');
      process.exit(0);
    })
  });
};
