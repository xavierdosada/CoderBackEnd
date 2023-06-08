const socket = io();

socket.on('updateproducts', (dataProducts) => {
    let container = document.getElementById('productsContainer')
    container.innerHTML = '';
    let html = dataProducts.map(product => {
        return `
        <h3>${product.title}</h3>
        <li>descripcion: ${product.description}</li>
        <li>precio: ${product.price}</li>
        <li>codigo: ${product.code}</li>
        <li>stock: ${product.stock}</li>
        `;
    })
    container.innerHTML = html.join('')
})