import { ins,upd } from '../../libs/mongo'
import { security } from '../../libs/api'

export default async (req, res) => {
    return new Promise(resolve => {
        const securityResult = security(req);
        if(securityResult.res=='error'){
            res.statusCode = 200
            res.json(securityResult)
            resolve()
        }else if(securityResult.res=='success'){
            var data = securityResult.data
            data.description = data.description.toUpperCase()
            if(data.description.length==0){
                res.statusCode = 200
                res.json({ res: 'error',error: 'Descrição é obrigatório!' })
                resolve()
            }else if(data.hour.length<5){
                res.statusCode = 200
                res.json({ res: 'error',error: 'Horario é obrigatório!' })
                resolve()
            }else if(data.dw0==false && data.dw1==false && data.dw2==false && data.dw3==false && data.dw4==false && data.dw5==false && data.dw6==false && data.dw7==false){
                res.statusCode = 200
                res.json({ res: 'error',error: 'Marque pelo menos um dia da semana!' })
                resolve()
            }else if(data._id.length==0){
                data.status = 1
                ins('routine',data,(result) => {
                    if(result.error){
                        res.statusCode = 200
                        res.json({res:'error',error:result.error})
                        resolve()
                    }else{
                        res.statusCode = 200
                        res.json({ res: 'success',data: result.data })
                        resolve()
                    }
                })
            }else{
                upd('routine',data,(result) => {
                    if(result.error){
                        res.statusCode = 200
                        res.json({res:'error',error:result.error})
                        resolve()
                    }else{
                        res.statusCode = 200
                        res.json({ res: 'success',data: result.data })
                        resolve()
                    }
                })
            }
        }else{
            res.statusCode = 200
            res.json({ res: 'error',error: 'undefined' })
            resolve()
        }    
    })
}