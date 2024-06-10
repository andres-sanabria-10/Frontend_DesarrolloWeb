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

// Función para guardar la venta
async function saveSale() {
  const userId = '6664eaa6cbf04cf25b11a83b'; // Reemplaza con el id del usuario actual
  const shoes = getSelectedProducts();

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
      console.error('Error al guardar la venta:', errorData);
    }
  } catch (error) {
    console.error('Error al guardar la venta:', error);
    if (error.response) {
      try {
        const errorData = await error.response.json();
        console.error('Error del servidor:', errorData);
      } catch (jsonError) {
        console.error('Error al analizar la respuesta del servidor:', jsonError);
      }
    } else {
      console.error('Error de conexión:', error.message);
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
