require("dotenv").config();
const Coin = require("../models/Coin");
exports.seedCoins = async () => {
    const coins = [
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

    for (var i = 0; i < coins.length; i++) {
        try {
            console.log(await coins[i].save())
        } catch (e) {
            console.error(e)
        }
    }
};