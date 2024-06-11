// Función para obtener los datos del usuario
const getUser = async (userId) => {
    const url = `https://apiteinda.onrender.com/users/${userId}`;

    try {
        const result = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!result.ok) {
            const errorText = await result.text();
            throw new Error(`HTTP error! status: ${result.status}, message: ${errorText}`);
        }

        const { data } = await result.json();
        console.log('Datos del usuario:', data);

        // Comprobar si los datos del usuario están completos
        if (!data || !data.name || !data.lastName || !data.mail) {
            throw new Error('Los datos del usuario están incompletos o no son válidos');
        }

        return data;
    } catch (err) {
        console.error("Error fetching user:", err);
        throw err;
    }
};

// Función para actualizar los datos del usuario
async function updateUser(userId, userData) {
    const url = `https://apiteinda.onrender.com/users/${userId}`;

    try {
        const result = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!result.ok) {
            const errorText = await result.text();
            throw new Error(`HTTP error! status: ${result.status}, message: ${errorText}`);
        }

        const data = await result.json();
        return data;
    } catch (err) {
        console.error("Error updating user:", err);
        throw err;
    }
}
const renderEditProfileForm = async () => {
    const userId = sessionStorage.getItem('userId');
    console.log("UserId obtenido de sessionStorage:", userId);

    if (!userId) {
        console.error("No se pudo obtener el userId de sessionStorage");
        alert("Error: No se pudo obtener el ID del usuario.");
        return;
    }

    try {
        const user = await getUser(userId);
        console.log("Datos del usuario obtenidos:", user);

        // Verifica la estructura de los datos del usuario
        if (!user || !user.name || !user.lastName || !user.mail || !user.password) {
            throw new Error('Los datos del usuario están incompletos o no son válidos');
        }

        const mainContainer = document.getElementById("modificar");
        mainContainer.innerHTML = `
            <br>
             <center>
        <div class="card border-success" style="width: 48rem;">
            <div class="card-body">
                <h5 class="card-title">Editar Perfil</h5>
                <form id="editProfileForm" class="row g-3 needs-validation">
                    <div class="col-md-6">
                        <label for="name" class="form-label">Nombre</label>
                        <input type="text" class="form-control" id="name" name="name" value="${user.name || ''}" required>
                    </div>
                    <div class="col-md-6">
                        <label for="lastName" class="form-label">Apellido</label>
                        <input type="text" class="form-control" id="lastName" name="lastName" value="${user.lastName || ''}" required>
                    </div>
                    <div class="col-12">
                        <label for="mail" class="form-label">Correo electrónico</label>
                        <input type="email" class="form-control" id="mail" name="mail" value="${user.mail || ''}" required>
                    </div>
                    <div class="col-12">
                        <label for="password" class="form-label">Contraseña</label>
                        <input type="password" class="form-control" id="password" name="password" placeholder="Ingresa una nueva contraseña">
                    </div>
                    <div class="col-12 text-center">
                        <button type="submit" class="btn btn-primary">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    </center>
        `;

        const editProfileForm = document.getElementById("editProfileForm");
        editProfileForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const formData = new FormData(editProfileForm);
            const updatedUser = {
                name: formData.get("name"),
                lastName: formData.get("lastName"),
                mail: formData.get("mail"),
                password: formData.get("password") || undefined, // No actualizar si no se introduce nueva contraseña
                role: "Usuario"
            };

            try {
                await updateUser(userId, updatedUser);
                console.log("Perfil actualizado correctamente");
                alert("Perfil actualizado con éxito.");
                window.location.href = "/IngresaUsuario";

                // Opcionalmente, puedes redirigir a otra página o actualizar la vista
            } catch (error) {
                console.error("Error al actualizar el perfil:", error);
                // Opcionalmente, puedes mostrar un mensaje de error al usuario
            }
        });
    } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
        // Opcionalmente, puedes mostrar un mensaje de error al usuario
    }
};



// Evento para mostrar el formulario cuando se hace clic en "Agregar Producto"
document.getElementById("EditUser").addEventListener("click", (e) => {
    e.preventDefault();
    renderEditProfileForm();
});
