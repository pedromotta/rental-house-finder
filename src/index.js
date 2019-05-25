require('dotenv').config()

const mongoose = require('mongoose');
const VivaReal = require('./viva-real');
const Email = require('./email');

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async function () {
    console.log("DB connected")
    start()
});

async function start() {
    const vivaReal = new VivaReal()
    vivaReal.findAll()
        .then(apartments => apartments.news())
        .then(apartments => apartments.save())
        .then(apartments => {
            console.log(apartments.length)
            if (apartments.length) {
                console.log('Enviar email')
                return new Email(apartments).send()
            }
        })
        .catch(console.error)
        .then(() => console.log('FIM'))
        .then(process.exit)
}
