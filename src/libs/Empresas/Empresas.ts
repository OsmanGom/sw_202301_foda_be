import { IEmpresa } from "@server/dao/models/Empresas/IEmpresas";
import { IDataAccessObject } from "@server/dao/IDataAccessObject";


export class Empresas {
    private empresas : IEmpresa[];
    private dao: IDataAccessObject;
    constructor(dao:IDataAccessObject){
        this.dao = dao;
        this.empresas = [];
    }

    getAll(){
        return this.dao.findAll;
    }

    getByid(id: string){
        return this.dao.finfById(id);
    }

    add(nuevaEmpresa : IEmpresa){
        
        const nueva : IEmpresa = {
            ...nuevaEmpresa, codigo: (Math.random()*1000).toString() + new Date().getTime().toString(),
            created: new Date(),
            updated: new Date()
        }
        return this.dao.create(nueva);
    }
   
    update(id:string, updateEmpresa: IEmpresa){
            const updateObject = {...updateEmpresa, updated: new Date()};
            return this.dao.update(id, updateObject)   
    };

    delete(id: string,){
        return this.dao.delete(id);
    }
}
