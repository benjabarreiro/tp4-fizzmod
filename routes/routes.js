import express from 'express';
const router = express.Router();

import controller from '../controller/controller.js';

router.post('/ingreso', controller.ingreso);

router.get('/listar', controller.listar);

router.get('/set-correo', controller.getCorreo);

router.post('/set-correo', controller.postCorreo);

export default router;