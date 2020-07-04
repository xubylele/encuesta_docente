export interface RespuestaI{
  idCurso:string,
  profes: [{
    id:string,
    data:[{
      idPreg:string,
      idResp:string,
    }]
  }]
}