require('dotenv').config()
const express = require('express')
const sequelize = require('./db.js')
const models = require('../server/models/models.js')
const PORT = process.env.PORT || 5000
const cors = require('cors')
const fileupload = require('express-fileupload')
const router = require('./routes/index.js')
const errorHandler = require('./middleware/ErrorHandlingMiddleware.js')
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
const app = express()

app.use(cors({ origin: '*', optionsSuccessStatus: 204 }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(fileupload({}));

app.use('/api', router);
app.use(errorHandler);

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/send', (req, res) => {
    const { username, email, phone, message } = req.body;
  
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    
    const mailOptions = {
        from: email,
        to: 'recipient-email@gmail.com',
        subject: `Новое сообщение от ${username}`,
        text: `Имя: ${username}\nEmail: ${email}\nТелефон: ${phone}\n\nСообщение:\n${message}`
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Ошибка при отправке письма:', error);
            return res.status(500).send(error.toString());
        }
        res.send('Письмо отправлено: ' + info.response);
    });
});

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

start();
