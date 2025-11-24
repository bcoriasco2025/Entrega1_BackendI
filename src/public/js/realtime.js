const socket = io();

document.getElementById("productForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const newProduct = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        code: document.getElementById("code").value,
        price: Number(document.getElementById("price").value),
        stock: Number(document.getElementById("stock").value),
        status: document.getElementById("status").value === 'true',
        category: document.getElementById("category").value,
        thumbnails: [document.getElementById("thumbnail").value]
    };

    socket.emit("newProduct", newProduct);
    e.target.reset();
});

socket.on('updateProducts', (products) => {
    const list = document.getElementById('realTimeList');
    list.innerHTML = '';

    products.forEach(p => {
        const cardCol = document.createElement('div');
        cardCol.className = 'col-md-4 mb-3';

        cardCol.innerHTML = `
            <div class="card h-100 text-center">
                <img src="${p.thumbnails[0] || ''}" class="card-img-top" alt="${p.title}">
                <div class="card-body">
                    <h5 class="card-title">${p.title}</h5>
                    <p class="card-text">${p.description || ''}</p>
                    <p class="card-text"><strong>Precio:</strong> $${p.price}</p>
                    <button class="btn btn-danger btn-sm mt-2" onclick="deleteProduct('${p.id}')">Eliminar</button>
                </div>
            </div>
        `;

        list.appendChild(cardCol);
    });
});

function deleteProduct(productId) {
    Swal.fire({
        title: '¿Está seguro que desea eliminarlo?',
        text: "Esta acción no se puede deshacer.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            socket.emit('deleteProduct', productId);

            Swal.fire(
                'Eliminado',
                'El producto ha sido eliminado.',
                'success'
            );
        }
    });
}
