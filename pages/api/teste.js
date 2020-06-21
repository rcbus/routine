import { query } from '../../libs/db'
import escape from 'sql-template-strings'

export default async (req, res) => {
    if(typeof req.query.id !== 'undefined'){
        const tarefa = await query(escape`
            SELECT *
            FROM tarefa
            WHERE id = ${req.query.id}
        `)      
        res.status(200).json({ tarefa })
    }else{
        const tarefa = await query(escape`
            SELECT *
            FROM tarefa
            WHERE 1
        `)
        res.status(200).json({ tarefa })
    }    
}