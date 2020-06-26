import { sel } from '../../libs/mongo'
import { security } from '../../libs/api'

export default async (req, res) => {
    return new Promise(resolve => {
        const securityResult = security(req);
        if(securityResult.res=='error'){
            res.statusCode = 200
            res.json(securityResult)
            resolve()
        }else if(securityResult.res=='success'){
            sel('routine',securityResult.data,{},(result) => {
                if(result.error){
                    res.statusCode = 200
                    res.json({res:'error',error:result.error})
                    resolve()
                }else{
                    var resultData = {
                        data:result.data
                    }
                    sel('config',{collection:'routine'},{branch:false,user:false,date:false,dateModification:false,historic:false},(result) => {
                        if(result.error){
                            res.statusCode = 200
                            res.json({res:'error',error:result.error})
                            resolve()
                        }else{
                            resultData.config = result.data
                            res.statusCode = 200
                            res.json({ res: 'success',data: resultData })
                            resolve()
                        }
                    })
                }
            },{_id:-1})
        }else{
            res.statusCode = 200
            res.json({ res: 'error',error: 'undefined' })
            resolve()
        }    
    })
}