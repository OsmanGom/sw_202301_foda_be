import express from 'express';
const router = express.Router();
import { Empresas , IEmpresa} from '@libs/Empresas/Empresas';


const empresasModel = new Empresas();
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

router.get('/all', (_req, res)=> {
    res.status(200).json(empresasModel.getAll());
    
});

router.get('/byid/:id', (req, res)=> {
    const {id: codigo} = req.params;
    const empresa = empresasModel.getByid(codigo);
    if(empresa){
        return res.status(200).json(empresa);
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

router.put('/upd/:id', (req, res)=> {
    const { id } = req.params;
    const { nombre = "John Doe Corp",
            status = "Activo",
            observacion = ""
          } = req.body; 
        const UpdateEmpresa : IEmpresa = {
            codigo: id,
            nombre,
            status,
            observacion
        };
        if(empresasModel.update(UpdateEmpresa)){
            res.status(200).json({"updated": true});
        }
    return res.status(404).json({"error": "Error al actualizar la empresa"});
});

router.delete('/del/:id', (req, res)=>{
    const {id:codigo} = req.params;
    if(empresasModel.delete(codigo)){
        res.status(200).json({"deleted":true})
    }
    return res.status(404).json({"error": "No se pudo eliminar Empresa"})
});


export default router;
