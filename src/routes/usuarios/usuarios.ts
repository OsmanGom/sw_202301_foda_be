import express from 'express';
const router = express.Router();
import { IUsuario, Usuarios } from '@server/libs/Usuarios/Usuarios';

const usersModel = new Usuarios();
usersModel.add({
    codigo: '',
    correo: 'admin@unicah.edu',
    nombre: 'Admin',
    password: 'Admin1234_',
    roles: 'Admin',
    created: undefined,
    ultimoAcceso: undefined
});

router.get('/', (_req, res)=>{
    const jsonUrls = {
        "getAll": {"method":"get", "url": "usuarios/all"},
        "getById": {"method":"get", "url": "usuarios/byid/:id"},
        "new": {"method":"post", "url": "usuarios/new"},
        "update": {"method":"put", "url": "usuarios/upt/:id"},
        "delete": {"method":"delete", "url": "usuarios/del/:id"},
    };
    res.status(200).json(jsonUrls);
});

router.get('/all', (_req, res)=>{
    res.status(200).json(usersModel.getAll());
})

router.get('/byid/:id', (req, res)=> {
    const {id: codigo} = req.params;
    const usuario = usersModel.getbyId(codigo);
    if(usuario){
        return res.status(200).json(usuario);
    }
    return res.status(404).json({"error": " No se encontro el registro"});
});

router.post('/new', (req, res) =>{
    const {correo, nombre, password, roles } = req.body;
    const newUsuario:IUsuario ={
        codigo: '',
        correo: correo,
        nombre: nombre,
        password: password,
        roles: roles
    }
    if(usersModel.add(newUsuario)){
        return res.status(200).json({"created": true});    
    }
    return res.status(404).json({
        "error": "Error al agregar un nuevo usuario"
    });
});


router.put('/upd/:id', (req, res) =>{
    const { id }  = req.params;
    const {correo, nombre, password, roles } = req.body;
    
    const UpdateUsuario: IUsuario = {
        codigo: id,
        correo,
        nombre,
        password,
        roles
    }

    if(usersModel.update(UpdateUsuario)){
        return res.status(200).json({"Update": true});
    }
    return res.status(404).json({"Error": "Error Actualizar"});
});

export default router;