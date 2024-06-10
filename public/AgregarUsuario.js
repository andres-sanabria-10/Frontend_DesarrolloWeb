async function addPUser(UserData) {
    try {
      var result = await fetch("https://apiteinda.onrender.com/users", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(UserData),
      });
  
      if (!result.ok) {
        throw new Error(`HTTP error! status: ${result.status}`);
      }
  
      var data = await result.json();
      return data;
    } catch (err) {
      console.error("Error adding user:", err);
      throw err;
    }
  }

  async function renderForm() {
    const mainContainer = document.getElementById("ContainerRigth");
    mainContainer.innerHTML = `
      <div class="card">
        <div class="card-header">
          <h1>Agregar Nuevo Usuario</h1>
        </div>
        <div class="card-body">
          <form id="addUserForm">
            <div class="mb-1">
              <label for="email" class="form-label">Correo electrónico</label>
              <input type="email" class="form-control" id="email" required>
            </div>
            <div class="mb-5">
              <label for="password" class="form-label">Contraseña</label>
              <input type="password" class="form-control" id="password" required>
            </div>
            <button type="submit" class="btn btn-primary">Agregar usuario</button>
            <a class="btn btn-primary" href="/">Iniciar Sesión</a>
          </form>
        </div>
      </div>
    `;
  
    document.getElementById("addUserForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      const newUser = {
        mail: document.getElementById("email").value,
        password: document.getElementById("password").value,
        role: "Usuario"
      };
  
      try {
        const addedUser = await addPUser(newUser);
        alert(`Usuario agregado con éxito! `);
        document.getElementById("addUserForm").reset();
      } catch (error) {
        console.error("Error:", error);
        alert("Error al agregar el usuario.");
      }
    });
  }
  
  // Evento para mostrar el formulario cuando se hace clic en "Agregar Producto"
  document.getElementById("Registro").addEventListener("click", (e) => {
    e.preventDefault();
    renderForm();
  });