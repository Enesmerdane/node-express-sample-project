const express = require('express')
const router = express.Router()

// routes
const authRoute = require('./auth.route')

const routesIndex = [
    {
        path: '/auth',
        route: authRoute
    }
]

routesIndex.forEach((val) => {
    router.use(val.path, val.route)
})

module.exports = router