const coinRoutes = require("./routes/coin");
const userRoutes = require('./routes/users')
const adminRoutes = require('./routes/admin')

module.exports = (app) => {
    app.use("/v1/coin", coinRoutes)
    app.use("/v1/admin", adminRoutes)
    app.use("/v1/user", userRoutes)
}