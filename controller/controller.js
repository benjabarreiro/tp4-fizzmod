import fs from 'fs';
import model from '../model/productos.js';
import sendEmail from '../correo/nodeMailer.js';

const controller = {
    ingreso: async (req, res) => {
        let producto = req.body;

        try {
            const nuevoProducto = new model.producto(producto);
            await nuevoProducto.save();
            let productos = await model.producto.find({}).lean();
            //console.log(sendEmail.sendEmail(productos));
            if(productos.length % 10 == 0) {
                await sendEmail.sendEmail(productos);
            }
            res.send('<h2>Producto cargado exitósamente</h2>')
        }
        catch(error) {
            console.log(`Error en operación: ${error}`);
            res.send(`<h2>Hubo un error: ${error}</h2>`);
        }
    },

    listar: (req, res) => {
        let { id } = req.params;
        let query = id ? {_id:id} : {};
        model.producto.find(query, (err, productos) => {
            if(err) throw new Error(`Error en la lectura de productos: ${err}`);
            productos.forEach(producto => {
                //console.log(producto);
                console.log('Se listaron los productos');
            });
            
            res.render('listar', {productos});
        });
    },

    getCorreo: (req, res) => {
        res.render('set-correo');
    },

    postCorreo: (req, res) => {
        ;(async() => {
            try {
                await fs.promises.writeFile('correo.dat', req.body.email, err => {
                    if (err) throw err;
                    console.log('guardado');
                });
            }
            catch(error) {
                console.log(`Error en operación: ${error}`);
            }
        })()
        res.redirect('/set-correo');
    }
}

export default controller;