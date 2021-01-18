const coinRoutes = require("./routes/coin");
const adminRoutes = require('./routes/admin')
const coinAnalysisRoutes = require('./routes/coinanalysis')
module.exports = (app) => {
    app.use("/v1/coin", coinRoutes)
    app.use("/v1/admin", adminRoutes)
    app.use("/v1/coin-analysis", coinAnalysisRoutes)

}