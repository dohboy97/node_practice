const express = require('express')
const app = express()
const PORT = 8000
const cors = require('cors')

app.use(cors())

const blueChipAPI = {

    'Microsoft':{
        'Ticker':'MSFT',
        'Value': 252.3,
        'Market Cap': '1.89 Trillion'
    },
    'Apple':{
        'Ticker':'AAPL',
        'Value':146.33,
        'Market Cap': '2.37 Trillion'
    },
    'Amazon':{
        'Ticker':'AMZN',
        'Value':111.14,
        'Market Cap': '1.89 Trillion'
    }

}

app.get('/api'),(request,response)=>{
    response.json(blueChipAPI)
}


app.get('/', (request, response)=>{
    response.sendFile(__dirname + '/index.html')
})

app.listen(process.env.PORT||PORT,()=>{
    console.log('Node running')
})