document.addEventListener('DOMContentLoaded', () => {
  const socket = io();

  const form = document.getElementById('productForm');
  const list = document.getElementById('realTimeList');

  if (!form || !list) return;

  // AGREGAR PRODUCTO
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const newProduct = {
      title: document.getElementById('title').value,
      description: document.getElementById('description').value,
      code: document.getElementById('code').value,
      category: document.getElementById('category').value,
      price: Number(document.getElementById('price').value),
      stock: Number(document.getElementById('stock').value),
      status: true,
      thumbnails: [document.getElementById('thumbnail').value || '']
    };

    socket.emit('newProduct', newProduct);
    form.reset();
  });

  
  // ACTUALIZAR LISTA
  socket.on('updateProducts', (products) => {
    list.innerHTML = '';

    products.forEach(p => {
      const col = document.createElement('div');
      col.className = 'col-md-4 mb-3';

      col.innerHTML = `
        <div class="card h-100">
          <img src="${p.thumbnails?.[0] || ''}" class="card-img-top">
          <div class="card-body text-center">
            <h5>${p.title}</h5>
            <p>${p.description || ''}</p>
            <p><strong>$ ${p.price}</strong></p>
            <button class="btn btn-danger btn-sm" onclick="deleteProduct('${p._id}')">
              Eliminar
            </button>
          </div>
        </div>
      `;

      list.appendChild(col);
    });
  });


  // ELIMINAR PRODUCTO
  window.deleteProduct = (productId) => {
    Swal.fire({
      title: '¿Eliminar producto?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        socket.emit('deleteProduct', productId);
      }
    });
  };
});
