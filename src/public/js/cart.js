async function addToCart(productId) {
  try {
    const response = await fetch(
      `/api/carts/${cartId}/products/${productId}`,
      { method: 'POST' }
    );

    const data = await response.json();

    if (data.status === 'success') {
      Swal.fire({
        icon: 'success',
        title: 'Producto agregado',
        timer: 1200,
        showConfirmButton: false
      });
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.message
    });
  }

  async function removeFromCart(productId) {
  try {
    const response = await fetch(
      `/api/carts/${cartId}/products/${productId}`,
      { method: 'DELETE' }
    );

    const data = await response.json();

    if (data.status === 'success') {
      Swal.fire({
        icon: 'success',
        title: 'Producto eliminado',
        timer: 1000,
        showConfirmButton: false
      }).then(() => {
        location.reload();
      });
    }
  } catch (error) {
    Swal.fire('Error', error.message, 'error');
  }
}
}
