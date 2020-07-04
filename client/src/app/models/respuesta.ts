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

/*export interface RespuestaI{
  idCurso:string,
  profes: [{
    idProfe:string
    data:[{
      idPreg:string,
      idResp:string,
    }]
  }]
}*/