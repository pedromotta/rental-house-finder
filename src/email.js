const nodemailer = require('nodemailer')

class Email {
    constructor(properties) {
        this.properties = properties
    }

    createTransporter() {
        return nodemailer.createTransport({
            host: 'smtp.office365.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            },
            tls: { ciphers: 'SSLv3' }
        });
    }

    async send() {
        const transporter = this.createTransporter();

        let info = await transporter.sendMail({
            from: '"Buscador de apto" <pedromotta@outlook.com>',
            to: 'pedromotta13@gmail.com, larissadpas25@gmail.com',
            subject: `${this.properties.length} novos imóveis`,
            text: 'Bora ver os novos aptos!!',
            html: this.properties.html()
        });

        console.log('Email enviado:', info.messageId);
    }
}

module.exports = Email
