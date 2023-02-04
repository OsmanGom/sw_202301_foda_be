import express from 'express';
const router = express.Router();
import { IUsuario, Usuarios } from '@server/libs/Usuarios/Usuarios';

const usersModel = new Usuarios();
usersModel.add({
    codigo: '',
    correo: 'admin@unicah.edu',
    nombre: 'Admin',
    password: 'Admin1234_',
    roles: ['ADM'],
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

router.post('/new', (_req, res)=> {
    console.log("Usuarios /new request body:");
    const {
        correo = 'admin@unicah.edu',
        nombre = 'Admin',
        password =  'Admin1234_',
       
    } = _req.body;

    const newUser_: IUsuario = {
        codigo: "",
        correo,
        nombre,
        password,
     
    };
    if (usersModel.add(newUser_)){
        return res.status(200).json({"created": true})
    }
    return res.status(404).json({"error": "Error al agregar un Usuario"});
});

router.put('/upd/:id', (req, res)=> {
    const { id } = req.params;
    const { 
        correo = 'admin@unicah.edu',
        nombre = 'Admin',
        password =  'Admin1234_',
        roles=['ADM']
          } = req.body; 
        const UpdateUser : IUsuario = {
            codigo: id,
            correo,
            nombre,
            password,
            roles: [],
        };
        if(usersModel.update(UpdateUser)){
            res.status(200).json({"updated": true});
        }
    return res.status(404).json({"error": "Error al actualizar el usuario"});
});

router.delete('/del/:id', (req, res)=>{
    const {id:codigo} = req.params;
    if(usersModel.delete(codigo)){
        res.status(200).json({"deleted":true})
    }
    return res.status(404).json({"error": "No se pudo eliminar Usuario"})
});

export default router;