console.log('Client side JavaScript')

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.getElementById('msgOne');
const messageTwo = document.getElementById('msgTwo');



 weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;

    messageOne.textContent = 'Loading resources'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
               messageOne.textContent = data.error
            } else {
               messageOne.textContent = data.location
               messageTwo.textContent =data.forecast
            }
        })


    })
    
})