import { query } from '../../libs/db'
import escape from 'sql-template-strings'
import { security } from '../../libs/api'

export default async (req, res) => {
    var consolidatedResponse = {}

    const securityResult = security(req);
    if(securityResult.res=='error'){
        consolidatedResponse = securityResult;
    }else if(securityResult.res=='success'){
        const data = securityResult.data
        if(data.description.length==0){
            consolidatedResponse = { res: 'error',error: 'Descrição é obrigatório!' }    
        }else if(data.hour.length<5){
            consolidatedResponse = { res: 'error',error: 'Horario é obrigatório!' }  
        }else if(data.dw0==false && data.dw1==false && data.dw2==false && data.dw3==false && data.dw4==false && data.dw5==false && data.dw6==false && data.dw7==false){
            consolidatedResponse = { res: 'error',error: 'Marque pelo menos um dia da semana!' }     
        }else{
            var columns = ""
            var values = ""
            var sql = ""
            function makeSql(key){
                if(key!='id'){
                    if(columns.length>0){
                        columns = columns + ','
                        values = values + ','
                    }
                    columns = columns + key
                    if(data[key]==true || data[key]==false){
                        values = values + data[key]
                    }else{
                        values = values + '\'' + data[key] + '\''
                    }
                }
            }
            Object.keys(data).map(makeSql)
            sql = 'INSERT INTO routine (' + columns + ') VALUES (' + values + ')'
            const resQuery = await query(sql)
            if(typeof resQuery.error !== 'undefined'){
                consolidatedResponse = { res: 'error',error: resQuery.error }
            }else{
                var newData = data
                newData.id = resQuery.insertId
                /*var temp = Object.values(data).join("','")*/      
                consolidatedResponse = { res: 'success',data: newData }
            }
        }
    }else{
        consolidatedResponse = { res: 'error',error: 'undefined' }
    }

    res.statusCode = 200
    res.json(consolidatedResponse)
}