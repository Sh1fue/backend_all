const sequelize = require('../db.js')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    name: { type: DataTypes.STRING },
    telephone: { type: DataTypes.INTEGER },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "User" },
    detail_id: { type: DataTypes.ARRAY(DataTypes.STRING)},
});


const Basket = sequelize.define('basket', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    detail_id: { type: DataTypes.ARRAY(DataTypes.INTEGER), allowNull: true, defaultValue: [] },
});

const Detail = sequelize.define('detail', {
    detail_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    img: { type: DataTypes.TEXT, allowNull: false },
    info_id: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT, allowNull: false },
    articul: { type: DataTypes.STRING, allowNull: false },
    manufacturer: { type: DataTypes.STRING }
});

const Order = sequelize.define('order', {
    order_id: { type: DataTypes.INTEGER, primaryKey: true },
    status: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    data_create: { type: DataTypes.INTEGER, allowNull: false },
    amount: { type: DataTypes.INTEGER, allowNull: false }
});


sequelize.sync().then(async () => {
    
    await sequelize.sync({ alter: true });
    console.log('База данных и таблицы созданы!');
}).catch((error) => {
    console.error('Ошибка при создании базы данных и таблиц:', error);
});

User.hasOne(Basket);
Basket.belongsTo(User);


module.exports = {
    User,
    Basket,
    Detail,
    Order
}
