const socket = io();

socket.on('updateproducts', (data) => {
    console.log(data)
})