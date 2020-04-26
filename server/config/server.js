const morgan = require('morgan')
const express = require('express')
const errorHandler = require('errorhandler')
const routes = require('../routes/index')

module.exports = app => {
    //Settings
    app.set('port', process.env.PORT || 3000)
    

    //Middlewares
    app.use(morgan('dev'))
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())


    routes(app)

    if('development' === app.get('env')){
        app.use(errorHandler)
    }

    return app
}