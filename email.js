const nodemailer = require("nodemailer");

class Email {
    constructor(properties) {
        this.properties = properties
    }

    async createTransporter() {
        let testAccount = await nodemailer.createTestAccount();
        return nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass
            }
        });
    }

    async send() {
        const transporter = await this.createTransporter();

        let info = await transporter.sendMail({
            from: '"Fred Foo 👻" <foo@example.com>',
            to: "bar@example.com, baz@example.com",
            subject: `${this.properties.length} novos imóveis`,
            text: 'Bora ver os novos aptos!!',
            html: this.properties.html()
        });

        console.log("Email enviado:", info.messageId);

        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
}

module.exports = Email
