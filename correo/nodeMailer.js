import nodemailer from 'nodemailer';
import fs from 'fs';

const sendEmail = async (productos) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'benjanodemailer@gmail.com',
            pass: 'pruebanm'
        }
    });
    
    let email = await fs.promises.readFile('./correo.dat', 'utf-8');

    let text = '';
    productos.forEach(producto => {
        text += `<h3>Nombre: ${producto.nombre}</h3>`;
        text += `<h3>Precio: $${producto.precio}</h3>`;
        text += `<h3>Descripción: ${producto.descripcion}</h3>`;
        text += `<img src="${producto.urlImg}" alt="Imagen: ${producto.nombre}">`;
    });

    const mailOptions = {
        from: 'benjanodemailer@gmail.com',
        to: email,
        subject: 'Listado de productos',
        html: text
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if(err) {
            console.log(err);
            return err;
        }
        console.log(info);
    });
}

export default {
    sendEmail
}