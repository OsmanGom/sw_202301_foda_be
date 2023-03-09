import { IFoda } from "@server/dao/models/FODA/IFoda";
import { IDataAccessObject } from "@server/dao/IDataAccessObject";

export class Foda{
    private fodaDao:IDataAccessObject;
    private empresaDao:IDataAccessObject;
    constructor(foda:IDataAccessObject,empresa:IDataAccessObject){
        this.fodaDao = foda;
        this.empresaDao = empresa;
    }
    public newFoda(nombre:string, empresaId:string){
        try{
            this.fodaDao.create()
        }catch(ex){

        }
    }
}