import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const productoShema = new Schema({
    nombre: String,
    precio: Number,
    descripcion: String,
    urlImg: String
});

const producto = mongoose.model('productos', productoShema);

export default {
    producto
}