async function updateProduct(productData) {
    if (!productData._id) {
      throw new Error("No se proporcionó ID de producto para actualizar.");
    }
  
    const url = `https://apiteinda.onrender.com/shoes/${productData._id}`;
    console.log(url);
  
    try {
      var result = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
  
      if (!result.ok) {
        const errorText = await result.text();
        throw new Error(`HTTP error! status: ${result.status}, message: ${errorText}`);
      }
  
      var data = await result.json();
      return data;
    } catch (err) {
      console.error("Error updating product:", err);
      throw err;
    }
  }
  
  async function fetchProduct(productId) {
    const response = await fetch(`https://apiteinda.onrender.com/shoes/${productId}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  }
  
  async function getProductById(productId) {
    try {
      const response = await fetch(`https://apiteinda.onrender.com/shoes/${productId}`);
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error al obtener el producto:', error);
      return null;
    }
  }
  
  async function renderFormEDIT(productId) {
    const product = await getProductById(productId);
    const mainContainer = document.getElementById("mainContainer");
    mainContainer.innerHTML = `
      <br>
      <div class="card border-success" style="width: 48rem;">
        <div class="card-body">
          <h5 class="card-title">Modificar Zapato </h5>
          <form id="editProductForm" class="row g-3 needs-validation">
            <div class="col-md-6">
              <label for="Brand" class="form-label">Marca</label>
              <input type="text" class="form-control" id="Brand" name="Brand" value="${product.Brand}" required>
            </div>
            <div class="col-md-6">
              <label for="Model" class="form-label">Modelo</label>
              <input type="text" class="form-control" id="Model" name="Model" value="${product.Model}">
            </div>
            <div class="col-6">
              <label for="Color" class="form-label">Color</label>
              <input type="text" class="form-control" id="Color" name="Color" value="${product.Color}" placeholder="Ingrese el color principal">
            </div>
            <div class="col-6">
              <label for="Size" class="form-label">Talla</label>
              <input type="number" class="form-control" id="Size" name="Size" value="${product.Size}" placeholder="Unidades en US">
            </div>
            <div class="col-md-6">
              <label for="Price" class="form-label">Precio</label>
              <input type="number" step="0.01" class="form-control" id="Price" name="Price" value="${product.Price}" placeholder="USD $">
            </div>
            <div class="col-md-6">
              <label for="Image" class="form-label">Url de la imagen</label>
              <input type="text" class="form-control" id="Image" name="Image" value="${product.Image}" placeholder="Url donde esta almacenada la imagen">
            </div>
            <div class="col-12 text-center">
              <label for="Stock" class="form-label">Stock</label>
              <input type="number" class="form-control" id="Stock" name="Stock" value="${product.Stock}" placeholder="Ingrese la cantidad en stock" required>
            </div>
            <div class="col-12">
              <button type="submit" class="btn btn-primary">Guardar</button>
            </div>
          </form>
        </div>
      </div>
    `;
    const editProductForm = document.getElementById("editProductForm");
    editProductForm.addEventListener("submit", async (event) => {
      event.preventDefault(); // Evita el envío predeterminado del formulario
  
      const formData = new FormData(editProductForm);
      const updatedProduct = {
        _id: productId,
        Brand: formData.get("Brand"),
        Model: formData.get("Model"),
        Color: formData.get("Color"),
        Size: formData.get("Size"),
        Price: formData.get("Price"),
        Image: formData.get("Image"),
        Stock: formData.get("Stock"),
      };
  
      try {
        await updateProduct(updatedProduct);
        console.log("Producto actualizado correctamente");
       // Mostrar alert con mensaje de éxito y botón de "Aceptar"
      const confirmRedirect = confirm("Modificación exitosa. ¿Desea volver a la página principal?");
      if (confirmRedirect) {
        // Redirigir a la URL deseada
        window.location.href = "/IngresaAdmin";
      }
        // Opcionalmente, puedes redirigir a otra página o actualizar la vista
      } catch (error) {
        console.error("Error al actualizar el producto:", error);
        // Opcionalmente, puedes mostrar un mensaje de error al usuario
      }
    });
  
  }