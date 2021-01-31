const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../../docs/swagger.json')
const router = require('express').Router()


router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument)) // route to swagger documentation


module.exports = router