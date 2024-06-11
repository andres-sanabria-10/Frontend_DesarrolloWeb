async function addProduct(productData) {
    try {
      var result = await fetch("https://apiteinda.onrender.com/shoes", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
  
      if (!result.ok) {
        throw new Error(`HTTP error! status: ${result.status}`);
      }
  
      var data = await result.json();
      return data;
    } catch (err) {
      console.error("Error adding product:", err);
      throw err;
    }
  }
  
  async function renderForm() {
    const mainContainer = document.getElementById("mainContainer");
    mainContainer.innerHTML = `
      <center>
      <div class="card" style="max-width:500px ;" >
        <div class="card-header">
          <h1>Agregar Nuevo Producto</h1>
        </div>
        <div class="card-body">
          <form id="addProductForm">
            <div class="col-md-6">
              <label for="marca" class="form-label">Marca</label>
              <input type="text" class="form-control" id="marca" required>
            </div>
            <div class="col-md-6">
              <label for="modelo" class="form-label">Modelo</label>
              <input type="text" class="form-control" id="modelo" required>
            </div>
            <div class="col-md-6">
              <label for="color" class="form-label">Color</label>
              <input type="text" class="form-control" id="color" required>
            </div>
            <div class="col-md-6">
              <label for="talla" class="form-label">Talla</label>
              <input type="number" class="form-control" id="talla" required>
            </div>
            <div class="col-md-6">
              <label for="precio" class="form-label">Precio</label>
              <input type="number" step="0.01" class="form-control" id="precio" required>
            </div>
            <div class="col-md-6">
              <label for="stock" class="form-label">Stock</label>
              <input type="number" class="form-control" id="stock" required>
            </div>
            <div class="col-md-6">
              <label for="imagen" class="form-label">URL de la Imagen</label>
              <input type="url" class="form-control" id="imagen" required>
            </div>
            <br>
            <button type="submit" class="btn btn-primary">Agregar Producto</button>
          </form>
        </div>
      </div>
     </center>
     
    `;
  
    document.getElementById("addProductForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      const newProduct = {
        Brand: document.getElementById("marca").value,
        Model: document.getElementById("modelo").value,
        Color: document.getElementById("color").value,
        Size: parseInt(document.getElementById("talla").value),
        Price: parseFloat(document.getElementById("precio").value),
        Stock: parseInt(document.getElementById("stock").value),
        Image: document.getElementById("imagen").value

      };
  
      try {
        const addedProduct = await addProduct(newProduct);
        alert(`Producto agregado con éxito! ID: ${addedProduct.id}`);
        document.getElementById("addProductForm").reset();
      } catch (error) {
        console.error("Error:", error);
        alert("Error al agregar el producto.");
      }
    });
  }
  
  // Evento para mostrar el formulario cuando se hace clic en "Agregar Producto"
  document.getElementById("addProductLink").addEventListener("click", (e) => {
    e.preventDefault();
    renderForm();
  });