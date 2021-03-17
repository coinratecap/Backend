const coinRoutes = require("./routes/coin");
const userRoutes = require('./routes/users')
const adminRoutes = require('./routes/admin')
const blogRoutes = require("./routes/blog");
const docsRoutes = require("./routes/docs")
const coinListingRoutes = require("./routes/coinListing")
const coinAnalysisRoutes = require('./routes/coinanalysis')
const exchangeRoutes = require('./routes/exchange')

module.exports = (app) => {
    app.use("/v1/coin", coinRoutes)
    app.use("/v1/admin", adminRoutes)
    app.use("/v1/coin-analysis", coinAnalysisRoutes)
    app.use("/v1/blog", blogRoutes)
    app.use("/v1/user", userRoutes)
    app.use("/v1/exchange", exchangeRoutes)
    app.use("/v1/docs", docsRoutes)
    app.use("/v1/coin-listing", coinListingRoutes)
}