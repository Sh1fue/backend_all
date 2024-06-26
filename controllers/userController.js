const ApiError = require('../errors/apiErroe');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/models')

const generateJwt = (id, email, role , name) => {
    return jwt.sign(
        {id, email, role , name},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const {email, password, role , name} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или password'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email,name, role, password: hashPassword})
        const token = generateJwt(user.id, user.email, user.role, user.name)
        return res.json({token,name: user.name  })
        
    }

    async login(req, res, next) {
        const {email, password} = req.body
        try {
            const user = await User.findOne({where: {email}})
            if (!user) {
                return res.status(404).json({message: 'Пользователь не найден'})
            }
            let comparePassword = bcrypt.compareSync(password, user.password)
            if (!comparePassword) {
                return res.status(401).json({message: 'Указан неверный пароль'})
            }
            const token = generateJwt(user.id, user.email, user.role, user.name, user.detail_id  )
            return res.json({token, name: user.name, role: user.role, user: user.id, detail_id: user.detail_id})
        } catch (error) {
            next(error)
        }
    }
    

    async  getUserById(req, res, ) {
        try {
            const userId = req.params.id;
            const user = await User.findByPk(userId);
    
            if (!user) {
                return res.status(404).json({ message: 'Пользователь не найден' });
            }
    
            res.json(user);
        } catch (error) {
            console.error('Error fetching user:', error);
            res.status(500).json({ message: 'Ошибка сервера' });
        }
    };





    
    
}
module.exports = new UserController()