const form = document.getElementById('registerForm')

form.addEventListener('submit', (evt) => {
    evt.preventDefault()
    const data = new FormData(form)
    const obj = {}
    data.forEach((value, key) => obj[key] = value);
    fetch('/register', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result => {
        if (result.status === 200){
            window.location.replace('/login')
        }
    });
});

const getCookie = () => {
    console.log(document.cookie)
}