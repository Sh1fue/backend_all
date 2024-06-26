const { Detail } = require('../models/models.js');

class DeviceController {
    async create(req, res) {
        const { name, price, img, info_id, articul, description, manufacturer } = req.body;
        const detail = await Detail.create({ name, price, img, info_id, manufacturer, description, articul });
        return res.json(detail);
    }

    async getAllDetails(req, res) {
        try {
            const details = await Detail.findAll();
            return res.json(details);
        } catch (error) {
            return res.status(500).json({ error: 'Сервер умер' });
        }
    }

    async get_one(req, res,) {
        const { id } = req.params;
    let detail;


    if (id) {
        detail = await Detail.findByPk(id);

        if (!detail) {
            return res.status(404).json({ message: 'Товар не найден' });
        }

        return res.json(detail);
    } else {

        const details = await Detail.findAll();
        return res.json(details);
    }
} catch (error) {

    res.status(500).json({ message: 'Ошибка при получении товара', error });
}
}
module.exports = new DeviceController();