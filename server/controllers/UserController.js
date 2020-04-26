const {User} = require('../models/index')

const ctrl = {}

ctrl.getUsers = (request, response)=>{
    const users = User.getUsers(request, response)
}

module.exports = ctrl