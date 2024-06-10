// Función para recolectar los productos seleccionados y sus cantidades
function getSelectedProducts() {
  const selectedProducts = [];
  const checkboxes = document.querySelectorAll('input[name="selectedProducts"]:checked');

  checkboxes.forEach(checkbox => {
    const _id = checkbox.value; // Obtener el valor del checkbox como '_id'
    const quantity = checkbox.parentNode.parentNode.querySelector('input[type="number"]').value;
    selectedProducts.push({ _id, quantity }); // Crear objeto con '_id' y 'quantity'
  });

  return selectedProducts;
}

// Función para mostrar un mensaje de error en pantalla
function showErrorMessage(message) {
  alert(message);
}

// Función para guardar la venta
async function saveSale() {
  const userId = sessionStorage.getItem('userId'); // Reemplaza con el id del usuario actual
  if (!userId) {
    showErrorMessage('No se encontró el ID del usuario. Por favor, inicie sesión nuevamente.');
    return;
  }
  
  const shoes = getSelectedProducts().map(product => ({
    shoeId: product._id,
    quantity: parseInt(product.quantity, 10)
  }));
  console.log("Enviando datos:", { userId, shoes });

  try {
    const response = await fetch('https://apiteinda.onrender.com/sales', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId, shoes })
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Venta guardada:', data);
      // Aquí puedes agregar lógica adicional después de guardar la venta exitosamente
    } else {
      const errorData = await response.json();
      console.error('Error al guardar la venta:', errorData.error);
      showErrorMessage(errorData.error); // Mostrar mensaje de error en pantalla
    }
  } catch (error) {
    console.error('Error al guardar la venta:', error);
    if (error.response) {
      try {
        const errorData = await error.response.json();
        console.error('Error del servidor:', errorData);
        showErrorMessage(errorData.error); // Mostrar mensaje de error en pantalla
      } catch (jsonError) {
        console.error('Error al analizar la respuesta del servidor:', jsonError);
        showErrorMessage('Error al analizar la respuesta del servidor'); // Mostrar mensaje de error en pantalla
      }
    } else {
      console.error('Error de conexión:', error.message);
      showErrorMessage('Error de conexión'); // Mostrar mensaje de error en pantalla
    }
  }
}

// Agregar evento clic al botón "Guardar"
var btnGuardar = document.getElementById('btnGuardar');
btnGuardar.addEventListener('click', function(event) {
  event.preventDefault(); // Evitar envío del formulario

  // Mostrar ventana de confirmación
  var confirmar = confirm("¿Estás seguro de guardar esta venta?");

  // Si el usuario confirma
  if (confirmar) {
    saveSale(); // Llamar a la función para guardar la venta
  } else {
    // Si el usuario cancela
    console.log("Venta cancelada");
  }
});