import { IDBConnection } from "@server/dao/IDBConnection";
import { MongoDAOBase } from "@server/dao/MongoDAOBase";

import { IEmpresa } from "./IEmpresas";

export class EmpresasDao extends MongoDAOBase<IEmpresa>{
    constructor(conexion: IDBConnection){
        super("empresas",conexion.getConnection());
    }
}