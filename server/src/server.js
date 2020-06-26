const express = require('express')
const config = require('./server/config')
const http = require('http')
require('./database')

const app = config(express())

/*app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'))
})*/


http.createServer(app).listen(app.get('port')),() => {
    console.log('server on port', app.get('port'));
}

