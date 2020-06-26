import { ins,upd, sel } from '../../libs/mongo'
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
            sel('config',{column:data.column,collection:data.collection},{},(result) => {
                if(result.error){
                    res.statusCode = 200
                    res.json({res:'error',error:result.error})
                    resolve()
                }else if(result.data.length==0){
                    ins('config',data,(result) => {
                        if(result.error){
                            res.statusCode = 200
                            res.json({res:'error',error:result.error})
                            resolve()
                        }else{
                            sel('config',{collection:data.collection},{branch:false,user:false,date:false,dateModification:false,historic:false},(result) => {
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
                    })
                }else{
                    data._id = result.data[0]._id
                    upd('config',data,(result) => {
                        if(result.error){
                            res.statusCode = 200
                            res.json({res:'error',error:result.error})
                            resolve()
                        }else{
                            sel('config',{collection:data.collection},{branch:false,user:false,date:false,dateModification:false,historic:false},(result) => {
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
                    })
                }
            })
        }else{
            res.statusCode = 200
            res.json({ res: 'error',error: 'undefined' })
            resolve()
        }
    })    
}