export interface IDataAccessObject{
    findAll: Function;
    finfById: Function;
    create: Function;
    update: Function;
    delete: Function;
    findByFilter: Function;
    findOneByFilter: Function;
    aggregate: Function;
    getConnection: Function;
    rawUpdate: Function;
}