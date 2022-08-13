const express = require('express')
const app = express()
const PORT = 8000
const cors = require('cors')
app.use(express.json())
require('dotenv').config()
app.use(cors())

let dbConnectionStr = process.env.DB_STRING

const MongoClient = require('mongodb').MongoClient

MongoClient.connect(dbConnectionStr, {useUnifiedTopology:true})
.then(client => {
    console.log('Connected to the Blue Chip API database.')
    const db = client.db('blue_chip_api')
    const blueChipCollection = db.collection(blue-chips)

    app.get('/', (req, res)=>{
        db.collection('blue-chips').find().toArray()
        .then(results=>{
            res.render('index.ejs',{ stocks : results})
        })
        .catch(err =>{
            console.log(err)
        })
    })
    
    app.get('/api/:blueChipName',(request,response)=>{
        const blueChipName = request.params.blueChipName.toLowerCase()
        if(blueChipAPI[blueChipName]){
        response.json(blueChipAPI[blueChipName])
        }else{
            response.json(blueChipAPI['unknown'])
        }
    })
    
    app.delete('/api/:blueChipName',(request,response)=>{
        const blueChipName = request.params.blueChipName.toLowerCase()
        delete blueChipAPI[blueChipName]
    
        response.status(204).end()
    })
    
    
    app.post('/api/blueChipAPI',(request, response)=>{
        const blueChipName = request.body
        console.log(blueChipName)
        response.json(blueChipName)
    })
    
    
    
    app.listen(process.env.PORT||PORT,()=>{
        console.log('Node running on Heroku')
    })
})




