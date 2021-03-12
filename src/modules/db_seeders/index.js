require("dotenv").config();
const mongoose = require("mongoose");
const Coin = require("../models/Coin");
const {
    seedCoins
} = require("./coin");
const {
    seedExchanges
} = require('./exchange')
const {
    seedExchangeApiStructures
} = require('./exchangeApiStructure')



const initializeDb = async () => {
    await mongoose.connect(process.env.DB_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
    });

    await seedCoins()
    await seedExchanges()
    await seedExchangeApiStructures()

    await mongoose.disconnect()
}

initializeDb()