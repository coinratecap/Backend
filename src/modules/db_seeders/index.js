require("dotenv").config();
const mongoose = require("mongoose");
const {
    seedCoins
} = require("./coin");
const {
    seedExchanges
} = require('./exchangeApiStructure_copy')


const initializeDb = async () => {
    await mongoose.connect(process.env.DB_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
    });

    await seedCoins()
    await seedExchanges()
    await seedExchangeApiStrctures()

    await mongoose.disconnect()
}

initializeDb()