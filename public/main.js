
const update = document.getElementsByClassName('fa-binoculars')
const trash = document.querySelector('.fa-trash')



Array.from(update).forEach(function(element) {
    element.addEventListener('click', function(){
       
      const name = this.parentNode.parentNode.parentNode.childNodes[1].innerText

      const ticker = this.parentNode.parentNode.parentNode.childNodes[3].innerText

      const mktcap = this.parentNode.parentNode.parentNode.childNodes[5].innerText

      const price = this.parentNode.parentNode.parentNode.childNodes[7].innerText

      const counter = parseFloat(this.parentNode.parentNode.parentNode.childNodes[9].innerText)
      
      console.log(name)

      fetch('stocks', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          'name': name,
          'ticker':ticker,
          'mktcap':mktcap,
          'price':price,
          'counter':counter
          
        })
      })
      .then(response => {
        if (response.ok) return response.json()
      })
      .then(data => {
        console.log(data)
        // window.location.reload(true)
      })
      .catch(err =>{
        console.log(err)
      })
    });
});