const express = require('express')
const app = express()
const PORT = 8000
const cors = require('cors')
app.use(express.json())
const bodyParser =require('body-parser')
require('dotenv').config()
app.use(cors())

let dbConnectionStr = process.env.DB_STRING

const MongoClient = require('mongodb').MongoClient

MongoClient.connect(dbConnectionStr, {useUnifiedTopology:true})
.then(client => {
    
    const db = client.db('blue_chip_api')
    const blueChipCollection = db.collection('blue-chips')
    app.set('view engine', 'ejs')
    app.use(bodyParser.urlencoded({extended:true}))
    app.use(bodyParser.json())
    app.use(express.static(__dirname + '/public'))
    app.get('/', (req, res)=>{
        db.collection('blue-chips').find().toArray()
        .then(results=>{
            
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
    
    app.put('/stocks',(req,res)=>{
        blueChipCollection.findOneAndUpdate(
            { name: req.body.name, ticker: req.body.ticker, mktcap: req.body.mktcap, price: req.body.price,},{
                $set:{
                    counter:req.body.counter +1
                }
            }, {
                sort: {_id: -1},
                upsert:true
            }, (err, result) => {
                res.send(result)
            }
        )
    })
    
   app.delete('/stocks',(req,res)=>{
       blueChipCollection.findOneAndDelete({
        name: req.body.name, ticker: req.body.ticker, mktcap: req.body.mktcap, price: req.body.price
       }, (err, result) => {
           if(err) return res.send(500, err)
           res.send('message deleted!')
       }
       )
   })
    
    
    
    app.listen(process.env.PORT||PORT,()=>{
        console.log('Node running on Heroku')
    })
})




