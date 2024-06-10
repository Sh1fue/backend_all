const {Type} = require('../models/models.js')
const ApiError = require('../errors/apiErroe.js')


class TypeControler {
    async create(req, res) {
       const {name} = req.body
       const type = await Type.create({name})
       return res.json(type)
    }
    async get_all(req, res) {
    }
}
module.exports = new TypeControler()
