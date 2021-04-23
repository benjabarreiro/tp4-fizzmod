import fs from 'fs';

const insertMail = async () => {
    try {
        let mail = fs.existsSync('./correo.dat');
        if(!mail) {
            let email = 'barreirobenjamin@gmail.com';
            await fs.promises.writeFile('./correo.dat', email);
        }
    }
    catch(error) {
        console.log(`Hubo un error: ${error}`);
    }
}

export default {
    insertMail
}