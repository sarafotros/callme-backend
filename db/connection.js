require ('dotenv').config()
const mongoose = require('mongoose')
const mongoDB = process.env.MONGODB_URL
const user = process.env.DB_USER
const pass = process.env.DB_PASS
const dbName = process.env.DB_NAME
const dbCluster = process.env.DB_CLUSTER

// const mongoDB = `mongodb+srv://${user}:${pass}@${dbCluster}/${dbName}?retryWrites=true&w=majority`;


mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true })
    // .catch(error => handleError(error))

    const db = mongoose.connection.on('error', err => {
        console.log(err)
});


if (!db) {
    console.log("Error connecting db");
} else {
    console.log("Db connected successfully");
}

module.exports = mongoose;
