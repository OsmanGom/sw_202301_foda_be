import bcrypt from 'bcryptjs';
export class Security{
    public static encodePassword(rawPassword: string){
        const encodePassword = bcrypt.hashSync(rawPassword,10);
    }

    public static verifi

}