
const {Detail} = require('../models/models.js')
class DeviceController {
    async create(req, res) {
        const {name,price, img, info_id , articul, description, manufacturer} = req.body
       

        const detail = await Detail.create({name , price,img,info_id,manufacturer,description,articul})
        return res.json(detail)
    }
    async get_all(req, res) {
        const details = await Detail.findAll(); 
        return res.json(details);

    }
    
    async  get_one(req, res, next) {
        const { id } = req.params; 
        const detail = await Detail.findByPk(id);
        if (!detail) {
            return res.status(404).json({ message: "Detail not found" });
        }
        return res.json(detail);
    
    }
}
module.exports = new DeviceController()
