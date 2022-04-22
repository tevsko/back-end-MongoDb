const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env'});

const conectarDB = async () =>{
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('base de datos conectada..');
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos') 
    }
}

module.exports = conectarDB;