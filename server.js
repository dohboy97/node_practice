const express = require('express')
const app = express()
const PORT = 8000
const cors = require('cors')

app.use(cors())

const blueChipAPI = {

    'microsoft':{
        'Ticker':'MSFT',
        'Value': 252.3,
        'marketCap': '1.89 Trillion'
    },
    'apple':{
        'Ticker':'AAPL',
        'Value':146.33,
        'marketCap': '2.37 Trillion'
    },
    'amazon':{
        'Ticker':'AMZN',
        'Value':111.14,
        'marketCap': '1.89 Trillion'
    },
    'unknown':{
        'Ticker':'Null',
        'Value':'Null',
        'marketCap': 'Null'
    }

}



app.get('/', (request, response)=>{
    response.sendFile(__dirname + '/index.html')
})

app.get('/api/:blueChipName',(request,response)=>{
    const blueChipName = request.params.blueChipName.toLowerCase()
    if(blueChipAPI[blueChipName]){
    response.json(blueChipAPI[blueChipName])
    }else{
        response.status(404).end()
    }
})


app.listen(process.env.PORT||PORT,()=>{
    console.log('Node running')
})