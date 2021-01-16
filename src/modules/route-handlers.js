const coinRoutes = require("./routes/coin");
const blogRoutes = require("./routes/blog");


module.exports = (app) => {
    app.use("/v1/coin", coinRoutes)
    app.use("/v1/blog", blogRoutes)


}