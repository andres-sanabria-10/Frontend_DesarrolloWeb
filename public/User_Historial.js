async function Table() {
    const url = `https://apiteinda.onrender.com/sales`;
    console.log(url);
  
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
  
      const response = await result.json();
      const data = response.data; // Asumo que el array de ventas está en response.data
  
      if (!Array.isArray(data)) {
        throw new Error('La respuesta del servidor no contiene un array de ventas');
      }
  
      const userNames = await getUserNames();
      return data.map(sale => ({
        ...sale,
        userName: userNames.find(user => user._id === sale.userId)?.name || 'Usuario desconocido'
      }));
    } catch (err) {
      console.error("Error updating product:", err);
      throw err;
    }
  }
  
  async function getUserNames() {
    const usersUrl = `https://apiteinda.onrender.com/users`;
  
    try {
      const result = await fetch(usersUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!result.ok) {
        const errorText = await result.text();
        throw new Error(`HTTP error! status: ${result.status}, message: ${errorText}`);
      }
  
      const response = await result.json();
      const users = response.data;
  
  
  
      return users;
    } catch (err) {
      console.error("Error obteniendo el nombre del usuario:", err);
      throw err;
    }
  }
  
  async function getShoes() {
    const usersUrl = `https://apiteinda.onrender.com/shoes`;
  
    try {
      const result = await fetch(usersUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!result.ok) {
        const errorText = await result.text();
        throw new Error(`HTTP error! status: ${result.status}, message: ${errorText}`);
      }
  
      const response = await result.json();
      const shoes = response.data;
  
      return shoes;
    } catch (err) {
      console.error("Error obteniendo el nombre del usuario:", err);
      throw err;
    }
  }
  
  async function renderTable(productId) {
    const mainContainer = document.getElementById("modificar");
    mainContainer.innerHTML = `
        <br>
        <div class="container" id="mainContainer">
          <div class="card">
            <div class="card-header">
              <h1>Tabla de Ventas</h1>
            </div>
            <div class="card-body">
              <table class="table">
                <thead>
                  <tr>
                    <th>Usuario</th>
                    <th>Fecha</th>
                    <th>Zapatos</th>
                    <th>Cantidad</th>
                    <th>Precio Total</th>
                  </tr>
                </thead>
                <tbody id="tBody">
                </tbody>
              </table>
            </div>
          </div>
        </div>
      `;
  
    // Obtener los datos del servidor
    const data = await Table();
    const shoes = await getShoes();
  
    // Crear un objeto que mapee los IDs de los zapatos a sus modelos y marcas
    const shoeMap = shoes.reduce((acc, shoe) => {
      acc[shoe._id] = { Model: shoe.Model, Brand: shoe.Brand };
      return acc;
    }, {});
  
    // Crear las filas de la tabla
    const tBody = document.getElementById("tBody");
    for (const sale of data) {
      const row = document.createElement("tr");
  
      row.innerHTML = `
        <td>${sale.userName}</td>
        <td>${sale.Date}</td>
        <td>
         ${sale.shoes.map((shoe) => {
          const { Model, Brand } = shoeMap[shoe.shoeId._id] || {};
          return `<div> Modelo: ${Model }  Marca: ${ Brand}</div>`;
        }).join('')}
        </td>
        <td>
          ${sale.shoes.map((shoe) => `<div>${shoe.quantity}</div>`).join('')}
        </td>
        <td>${sale.totalPrice}</td>
      `;
      tBody.appendChild(row);
    }
  }
  
  // Evento para mostrar el formulario cuando se hace clic en "Agregar Producto"
  document.getElementById("TableUserBuy").addEventListener("click", (e) => {
    e.preventDefault();
    renderTable();
  });