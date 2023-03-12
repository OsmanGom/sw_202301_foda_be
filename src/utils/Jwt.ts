import * as jwt from 'jsonwebtoken';
export class JWT{
    private static secret = process.env.JWT_SECRET;
    public static singTWT(payload: object){
        return jwt.sing(payload, this.secret);
    }

    public static verifyJWT(token:string){
        return jwt.verify
    }
}