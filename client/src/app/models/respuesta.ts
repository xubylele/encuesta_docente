export interface RespuestaI{
    profe:string,
    sections: [{
      section:number
      data: [{
        preg:string,
        idResp:string,
      }]
    }]
}