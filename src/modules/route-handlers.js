const coinRoutes = require("./routes/coin");
const blogRoutes = require("./routes/blog");
const adminRouter = require('./routes/admin')
const coinAnalysisRoutes = require('./routes/coinanalysis')

module.exports = (app) => {
    app.use("/v1/coin", coinRoutes)
    app.use("/v1/blog", blogRoutes)
    app.use("/v1/admin", adminRouter)
    app.use("/v1/coin-analysis", coinAnalysisRoutes)
}




