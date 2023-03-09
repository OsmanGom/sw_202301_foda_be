import { MongoDAOBase } from "@server/dao/MongoDAOBase"; 
import { IFoda, DefaultFoda } from "./IFoda";
import { IDBConnection } from "@server/dao/IDBConnection";

import { IDataAccessObject } from "@server/dao/IDataAccessObject";
import { ObjectId } from "mongodb";


export class Foda extends MongoDAOBase<IFoda>{

    private empresaDao: IDataAccessObject;
    constructor(conexion: IDBConnection, empresasDao:IDataAccessObject){
        super("foda", conexion);
    }
    public async create(foda:IFoda){
        const {empresa: {id}} = foda;
        if (ObjectId.isValid(id)){
            throw Error ("mpresa Object Id not Valid")
        }
        const {_id, nombre} = await this.empresaDao.finfById(id.toString());
        const newFoda = {
            ...DefaultFoda,
            ...foda, 
            ...{empresa:{id:_id, nombre}},
            ...{createdAt : new Date(), updatedAt : new Date()}
    };
        newFoda.empresa = {id: _id, nombre}
        newFoda.createdAt = new Date();
        newFoda.updatedAt = new Date();
        return super.create(newFoda);
    }
}
