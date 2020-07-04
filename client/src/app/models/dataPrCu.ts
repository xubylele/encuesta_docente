export interface ProfCursosApi{
    courses:[{
        course:{
            acronym:string,
            name:string,
            _id:string
        }
        teachers:[{
            names:string,
            last_names:string
            _id:string
        }]
    }]
}