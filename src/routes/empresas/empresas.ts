import express from 'express';
const router = express.Router();
import { Empresas } from '@libs/Empresas/Empresas';
import { EmpresasDao } from '@server/dao/models/Empresas/EmpresasDAO';
import { MongoDBConn } from '@server/dao/mongoDBConn';
import { IEmpresa } from '@server/dao/models/Empresas/IEmpresas';

const empresasModel = new Empresas(new EmpresasDao(MongoDBConn));
empresasModel.add({
    codigo: '',
    nombre: 'Mi empresa',
    status: 'Activo',
    created: undefined,
    updated: undefined
});
//registrar el endpoints en router 

router.get('/', (_req, res)=> {
    const jsonUrls = {
        "getAll": {"method":"get", "url": "empresas/all"},
        "getById": {"method":"get", "url": "empresas/byid/:id"},
        "new": {"method":"post", "url": "empresas/new"},
        "update": {"method":"put", "url": "empresas/upt/:id"},
        "delete": {"method":"delete", "url": "empresas/del/:id"},
    };
    res.status(200).json(jsonUrls);
});

router.get('/all', async (_req, res)=> {
    res.status(200).json(await empresasModel.getAll());
    
});

router.get('/byid/:id', async(req, res)=> {
    const {id: codigo} = req.params;
    const empresa = empresasModel.getByid(codigo);
    if(empresa){
        return res.status(200).json( empresa);
    }
    return res.status(404).json({"error": " No se encontro el registro"});
});

router.post('/new', (_req, res)=> {
    console.log("Empresas /new request body:");
    const {
        nombre ="John Doe Corp",
        status = "Activo"
    } = _req.body;

    const newEmpresa: IEmpresa = {
        codigo: "",
        nombre,
        status,
    };
    if (empresasModel.add(newEmpresa)){
        return res.status(200).json({"created": true})
    }
    return res.status(404).json({"error": "Error al agregar una nueva empresa"});
});

router.put('/upd/:id', async(req, res)=> {
    const { id } = req.params;
    const { nombre = "----NotRecieved-----",
            status = "----NotRecieved-----",
            observacion = "", 
            codigo = ""
          } = req.body; 

          if (nombre === "----NotRecieved-----"|| status === "----NotRecieved-----"){
            return res.status(403).json({"error":"Debe venir el nombre y estatus correctos"});
          }


        const UpdateEmpresa : IEmpresa = {
            codigo,
            nombre,
            status,
            observacion
        };
        if(await empresasModel.update(id,UpdateEmpresa)){
            res.status(200).json({"updated": true});
        }
    return res.status(404).json({"error": "Error al actualizar la empresa"});
});

router.delete('/del/:id', async(req, res)=>{

    const {id} = req.params;
    if(await empresasModel.delete(id)){
        res.status(200).json({"deleted":true})
    }
    return res.status(404).json({"error": "No se pudo eliminar Empresa"})
});


export default router;
