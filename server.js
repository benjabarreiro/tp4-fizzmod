import express from 'express';
import mongoose from 'mongoose';

import router from './routes/routes.js';
import insertMail from './correo/insertMail.js';

const app = express();

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static('public'));

app.use('/', router);

const PORT = process.env.PORT || 8080;

mongoose.connect('mongodb+srv://benja-barreiro:benja123@cluster0.g6ufp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if(err) throw new Error(`Error en la conexión con la base de datos ${err}`);
    console.log('Base de datos conectada');

    const server = app.listen(PORT, () => {
        insertMail.insertMail();
        console.log(`Servidor corriendo en el puerto ${server.address().port}`);
    });
    server.on('error', error => console.log(`Error en el Servidor ${error}`));
});