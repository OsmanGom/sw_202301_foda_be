import { IDataAccessObject } from "./IDataAccessObject";
import {Db, Collection, Document, ObjectId, Filter, OptionalUnlessRequiredId} from 'mongodb';

export abstract class MongoDAOBase<T> implements IDataAccessObject{

    public persistanceName: string;
    private connection: Db; 
    private collection: Collection<T>;

    public constructor(entityName:string, connection:Db){
        this.persistanceName = entityName;
        this.collection = this.connection.collection(this.persistanceName);
    }
   

    findAll(){
        this.collection.find({}).toArray();
    };
    finfById(id:string){
        const _id: Filter<T> =new ObjectId(id) as Filter<T> ;
        return this.collection.findOne({_id});
    }
    create(newEntity: Partial<T> ){
        return this.collection.insertOne(newEntity as OptionalUnlessRequiredId<T>);

    };
    update: Function;
    delete: Function;
    findByFilter: Function;
    findOneByFilter: Function;
    aggregate: Function;
    getConnection(){
        return this.connection;
    };
    rawUpdate: Function;
}
