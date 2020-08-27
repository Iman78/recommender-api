import mongoose from "mongoose";
import {dbConfig} from './config';

const MONGODB_USER = dbConfig.MONGODB_USER;
const MONGODB_PASSWORD= dbConfig.MONGODB_PASSWORD;
const MONGODB_DBNAME= dbConfig.MONGODB_DBNAME;

const connectionString =`mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@cluster0.q6mef.azure.mongodb.net/${MONGODB_DBNAME}?retryWrites=true&w=majority`

class Connection {
  constructor() {
    mongoose.Promise = global.Promise;
    mongoose.set("useNewUrlParser", true);
    mongoose.set("useFindAndModify", false);
    mongoose.set("useCreateIndex", true);
    mongoose.set("useUnifiedTopology", true);
    mongoose.connect(connectionString);
    
  }
}

export default new Connection();
