const express = require('express')
const app = express()
const PORT = 8000
const cors = require('cors')

app.use(cors())

const blueChipAPI = {

    'microsoft':{
        'Ticker':'MSFT',
        'Value': 252.3,
        'Market Cap': '1.89 Trillion'
    },
    'apple':{
        'Ticker':'AAPL',
        'Value':146.33,
        'Market Cap': '2.37 Trillion'
    },
    'amazon':{
        'Ticker':'AMZN',
        'Value':111.14,
        'Market Cap': '1.89 Trillion'
    },
    'unknown':{
        'Ticker':'Null',
        'Value':'Null',
        'Market Cap': 'Null'
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
        response.json(blueChipAPI['unknown'])
    }
})


app.listen(process.env.PORT||PORT,()=>{
    console.log('Node running')
})