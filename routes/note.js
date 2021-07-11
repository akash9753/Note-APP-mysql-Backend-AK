const express = require('express')
const db = require('../db')
const utils = require('../utils')
//const mailer = require('../mailer')

const router = express.Router()

router.post('/:userId',(request, response)=>{
         const {contents} = request.body
         const {userId} = request.params
         const statement = `insert into note (userId, contents) values ('${userId}', '${contents}')`
        db.query(statement,(error,data)=>{
            response.send(utils.sendResult(error, data))
        })
})

// get all notes
router.get('/',(request, response)=>{
    
    const statement = `select * from note`
   db.query(statement,(error,data)=>{
       response.send(utils.sendResult(error, data))
       console.log(data[1])
   })
})

//get notes by user id
router.get('/:userId',(request, response)=>{
    const {userId} = request.params
    const statement = `select * from note where userid = '${userId}'`
    db.query(statement,(error,data)=>{
       response.send(utils.sendResult(error, data))
   })
})

//update notes
router.put('/:noteId',(request, response)=>{
    const {noteId} = request.params
    const {contents} = request.body
    const statement = `update note set contents='${contents}' where id = ${noteId}`
    db.query(statement,(error,data)=>{
       response.send(utils.sendResult(error, data))
   })
})

//delete note by user id
router.delete('/:noteId',(request,response)=>{
    const {noteId}  = request.params
    const statement = `delete from note where id = ${noteId}`
    db.query(statement, (error, result)=>{
        response.send(utils.sendResult(error, result)) 
    }) 
})

module.exports = router