async function verifyCredentials(email, password) {
    try {
      const response = await fetch('https://apiteinda.onrender.com/users');
      const data = await response.json();
      const users = data.data;
  
      // Buscar el usuario con las credenciales ingresadas
      const user = users.find(u => u.mail === email && u.password === password);
  
      if (user) {
        if (user.role === 'Administrador') {
          // Redirigir a la página de Administrador
          window.location.href = '/IngresaAdmin';
        } else if (user.role === 'Usuario') {
          // Redirigir a la página de Usuario
          window.location.href = '/IngresaUsuario';
        } else {
          return { success: false, message: 'Rol de usuario no válido' };
        }
      } else {

        return { success: false, message: 'Credenciales incorrectas' };
      }
    } catch (err) {
      console.error(err);
      return { success: false, message: 'Error al verificar las credenciales' };
    }
  }

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('form');
  
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault(); // Prevenir el envío del formulario por defecto
  
      // Obtener los valores de los campos de entrada
      const email = document.getElementById('floatingInput').value;
      const password = document.getElementById('floatingPassword').value;
  
      // Verificar las credenciales con la API
      const result = await verifyCredentials(email, password);
  
      if (result.success) {
        // Credenciales válidas, redirigir al usuario o mostrar un mensaje de éxito
        console.log('Inicio de sesión exitoso');
      } else {
        // Credenciales inválidas, mostrar un mensaje de error
        console.log('Credenciales incorrectas');
      
      }
    });
  
    const submitBtn = document.getElementById('submitBtn');
  
    submitBtn.addEventListener('click', async (event) => {
      event.preventDefault(); // Prevenir el comportamiento predeterminado del botón
  
      // Obtener los valores de los campos de entrada
      const email = document.getElementById('floatingInput').value;
      const password = document.getElementById('floatingPassword').value;
  
      // Verificar las credenciales con la API
      const result = await verifyCredentials(email, password);
  
      if (result.success) {
        // Credenciales válidas, redirigir al usuario o mostrar un mensaje de éxito
        console.log('Inicio de sesión exitoso');
      } else {
        // Credenciales inválidas, mostrar un mensaje de error
        alert(result.message);
      }
    });
  });
