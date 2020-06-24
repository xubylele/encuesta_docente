export interface JwtResponseI{
    dataUser:{
        id:number,
        name:string,
        last_name:string,
        email:string,
        accessToken:string,
        expiresIn:string,
    }
}