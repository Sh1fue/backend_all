const sequelize = require('../db.js')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user',{
id: {type: DataTypes.INTEGER, primaryKey: true,autoIncrement: true},
email: {type: DataTypes.STRING, unique:true},
name: {type: DataTypes.STRING, },
telephone: {type:DataTypes.INTEGER},
password:{type:DataTypes.STRING,},
role:{type:DataTypes.STRING,defaultValue:"User"}
});

const Basket = sequelize.define('basket',{
id:{type:DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
});

const BasketDevice = sequelize.define('basket_device',{
id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
});

const Detail = sequelize.define('detail',{
detail_id:{type:DataTypes.INTEGER,primaryKey:true, autoIncrement:true},
name:{type:DataTypes.STRING, unique:true, allowNull:false},
price:{type:DataTypes.INTEGER, allowNull:false},
img:{type:DataTypes.STRING, allowNull:false},
info_id:{type:DataTypes.STRING},
description:{type:DataTypes.STRING,allowNull:false},
articul:{type:DataTypes.STRING, allowNull:false},
manufacturer:{type:DataTypes.STRING}
});

const Order = sequelize.define('order',{
order_id:{type:DataTypes.INTEGER, primaryKey:true},
status:{type:DataTypes.STRING, allowNull:false},
price:{type:DataTypes.INTEGER, allowNull:false},
data_create:{type:DataTypes.INTEGER, allowNull:false},
amount:{type:DataTypes.INTEGER, allowNull:false}
})






User.hasOne(Basket)
Basket.belongsTo(User)

Basket.hasMany(BasketDevice)
BasketDevice.belongsTo(Basket)

BasketDevice.hasOne(Detail)
Detail.belongsTo(BasketDevice)

module.exports = {
User,
Basket,
BasketDevice,
Detail,
Order
}