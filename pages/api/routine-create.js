import { ins,upd } from '../../libs/mongo'
import { security } from '../../libs/api'

export default async (req, res) => {
    var consolidatedResponse = {}

    const securityResult = security(req);
    if(securityResult.res=='error'){
        consolidatedResponse = securityResult;
    }else if(securityResult.res=='success'){
        const data = securityResult.data
        if(data.description.length==0){
            res.statusCode = 200
            res.json({ res: 'error',error: 'Descrição é obrigatório!' })
        }else if(data.hour.length<5){
            res.statusCode = 200
            res.json({ res: 'error',error: 'Horario é obrigatório!' })
        }else if(data.dw0==false && data.dw1==false && data.dw2==false && data.dw3==false && data.dw4==false && data.dw5==false && data.dw6==false && data.dw7==false){
            res.statusCode = 200
            res.json({ res: 'error',error: 'Marque pelo menos um dia da semana!' })
        }else{
            ins('routine',data,(result) => {
                if(result.error){
                    res.statusCode = 200
                    res.json({res:'error',error:result.error})
                }else{
                    res.statusCode = 200
                    res.json({ res: 'success',data: result.data })
                }
            })
        }
    }else{
        res.statusCode = 200
        res.json({ res: 'error',error: 'undefined' })
    }    
}