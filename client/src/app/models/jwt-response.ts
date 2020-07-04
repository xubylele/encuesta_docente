export interface JwtResponseI{
    id?:number,
    names?:string,
    last_names?:string,
    email?:string,
    token:string,
    type:string,
    expiresIn?:string,
}