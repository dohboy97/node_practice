document.querySelector('button').addEventListener('click',getInfo)

async function getInfo(){
    let blueChip = document.querySelector('input').value

    try{
        const response = await fetch (`https://blue-chip-api.herokuapp.com/api/${blueChip}`)
        const data = await response.json()
        console.log(data)
            document.querySelector('#ticker').innerText = data.Ticker        
            document.querySelector('#mktCap').innerText = data.Value
            document.querySelector('#price').innerText = data.marketCap
    }catch(error){
        console.log(error)
    }
}