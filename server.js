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
    const blueChipCollection = db.collection('blue-chips')

    app.get('/', (req, res)=>{
        db.collection('blue-chips').find().toArray()
        .then(results=>{
            console.log('success')
            res.render('index.ejs',{ stocks : results})
        })
        .catch(err =>{
            console.log(err)
        })
    })
    
    app.post('/stocks',(req,res)=>{
        blueChipCollection.insertOne(req.body)
        .then(result=>{
            res.redirect('/')
            console.log(result)
        })
        .catch(err=>{
            console.log(err)
        })
    })
    
    
    // app.delete('/api/:blueChipName',(request,response)=>{
    //     const blueChipName = request.params.blueChipName.toLowerCase()
    //     delete blueChipAPI[blueChipName]
    
    //     response.status(204).end()
    // })
    
    
   
    
    
    
    app.listen(process.env.PORT||PORT,()=>{
        console.log('Node running on Heroku')
    })
})




