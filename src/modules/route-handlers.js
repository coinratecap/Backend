const coinRoutes = require("./routes/coin");

module.exports = (app) => {
    app.use("/v1/coin", coinRoutes)

}