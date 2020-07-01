require('dotenv').config()
const morgan = require('morgan')
const express = require('express')
const errorHandler = require('errorhandler')
const routes = require('../routes/index')
/*CORS*/
const cors = require('cors')

module.exports = app => {
    //Settings
    app.set('port', process.env.PORT || 3001)
    

    //Middlewares
    app.use(morgan('dev'))
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())

    /*Using Cors*/
    app.use(cors())
    /*
    var whitelist = ['http://localhost:4200']
    var corsOpt = {
        origin: function (origin,callback){
            if(whitelist.indexOf(origin) != -1){
                callback(null,true);
            } else{
                callback(new Error('No Cors'));
            }
        }
    }

    app.get('/',cors(corsOpt), (req,res) => {
        res.json({msje: 'ok'})
    })*/


    routes(app)

    if('development' === app.get('env')){
        app.use(errorHandler)
    }

    return app
}