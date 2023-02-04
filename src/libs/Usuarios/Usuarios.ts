export interface IUsuario {
    codigo: string;
    correo: string;
    nombre: string;
    password: string;
    roles: string[];
    created?: Date;
    ultimoAcceso?: Date;
    observacion?: string;
}

export class Usuarios{
    private usuarios: IUsuario[];
    constructor(){
        this.usuarios = [];
    }
        getAll(){
            return this.usuarios;
        }

        getbyId(codigo: string){
            const UsuarioToReturn = this.usuarios.find((usu)=> {    
                return usu.codigo === codigo;
            });
            return UsuarioToReturn;
        }
 
        add(nuevoUsuario : IUsuario){
            const nuevo :IUsuario = {
                ...nuevoUsuario, codigo: (Math.random()*1000).toString() + new Date().getTime().toString(),
                roles: ['ADM'],
                created: new Date(),
                ultimoAcceso: new Date()
            }
            this.usuarios.push(nuevo);
            return true;
        } 

        update(updateUsuario: IUsuario){
            let updated = false;
            const newUser:IUsuario[]= this.usuarios.map((usu)=>{
                if(usu.codigo === updateUsuario.codigo){
                    updated = true;
                    return {...usu, ...updateUsuario, ultimoAcceso:new Date()};
                }
                return usu;
            })
            this.usuarios = newUser;
            return updated;
        }
     
}

