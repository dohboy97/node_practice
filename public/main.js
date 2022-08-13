
const update = document.getElementsByClassName('fa-binoculars')
const trash = document.querySelector('.fa-trash')

// document.querySelector('fa-binoculars').addEventListener('click',function(){
//     console.log('test')
// })

Array.from(update).forEach(function(element) {
    element.addEventListener('click', function(){
        console.log('test')
      const name = this.parentNode.parentNode.childNodes[1].innerText
      
      fetch('stocks', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          'name': name,
          
        })
      })
      .then(response => {
        if (response.ok) return response.json()
      })
      .then(data => {
        console.log(data)
        window.location.reload(true)
      })
    });
});