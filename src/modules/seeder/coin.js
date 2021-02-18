require("dotenv").config();
const Coin = require("../models/Coin");
const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

let runner = async () => {
    let coin = [
        new Coin({
            name: "Bitcoin",
            symbol: "BTC",
            logo: "https://unsplash.com/photos/OG3A-ilG8AY",
            is_active: true,
            description: "dummy description for bit coin...stay blessed",
        }),

        new Coin({
            name: "Etherum",
            symbol: "ETH",
            logo: "https://unsplash.com/photos/OG3A-ilG8AY",
            is_active: true,
            description: "dummy description for bit coin...stay blessed",
        }),

        new Coin({
            name: "Litecoin",
            symbol: "LTC",
            logo: "https://unsplash.com/photos/OG3A-ilG8AY",
            is_active: true,
            description: "dummy description for bit coin...stay blessed",
        }),
    ];

    let done = 0;

    for (var i = 0; i < coin.length; i++) {
        coin[i].save((err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
            }
            done++;
            if (done === coin.length) {
                exit();
            }
        });
    }
};





runner();

let exit = () => {
    mongoose.disconnect();
};