export interface JwtResponseI{
    dataUser:{
        id:number,
        names:string,
        last_names:string,
        email:string,
        accessToken:string,
        expiresIn:string,
    }
}