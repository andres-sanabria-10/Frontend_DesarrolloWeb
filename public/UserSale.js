async function loadDataCard() {
    try {
        var result = await fetch("https://apiteinda.onrender.com/shoes");
    } catch (err) {
        return err;
    }
    return result;
}

loadDataCard()
    .then(r => r.json())
    .then(data => {
        const cardContainer = document.getElementById("cardContainer");
        data.data.forEach(shoe => {
            const cardDiv = document.createElement("div");
            cardDiv.className = "col-md-4";

            const cardElement = document.createElement("div");
            cardElement.className = "card";
            cardElement.style.marginTop = "10px";

            const cardHeader = document.createElement("div");
            cardHeader.className = "card-header";
            cardHeader.textContent = `${shoe.Brand} / ${shoe.Model}`;

            const imgElement = document.createElement("img");
            imgElement.src = shoe.Image;
            imgElement.className = "card-img-top";
            imgElement.alt = `Imagen de ${shoe.Brand} ${shoe.Model}`;

            const cardBody = document.createElement("div");
            cardBody.className = "card-body";

            const priceElement = document.createElement("p");
            priceElement.textContent = shoe.Price;
            cardBody.appendChild(priceElement);

            const cardFooter = document.createElement("div");
            cardFooter.className = "card-footer";

            const checkboxDiv = document.createElement("div");
            checkboxDiv.className = "form-check";

            const checkboxInput = document.createElement("input");
            checkboxInput.type = "checkbox";
            checkboxInput.className = "form-check-input";
            checkboxInput.id = `comprarCheckbox-${shoe.id}`;
            checkboxInput.dataset.target = `cantidadesDiv-${shoe.id}`;
            checkboxInput.name = "selectedProducts";
            checkboxInput.value = shoe.id;

            const checkboxLabel = document.createElement("label");
            checkboxLabel.className = "form-check-label";
            checkboxLabel.htmlFor = `comprarCheckbox-${shoe.id}`;
            checkboxLabel.textContent = "Comprar";

            checkboxDiv.appendChild(checkboxInput);
            checkboxDiv.appendChild(checkboxLabel);
            cardFooter.appendChild(checkboxDiv);

            cardElement.appendChild(cardHeader);
            cardElement.appendChild(imgElement);
            cardElement.appendChild(cardBody);
            cardElement.appendChild(cardFooter);
            cardDiv.appendChild(cardElement);
            cardContainer.appendChild(cardDiv);
        });
    })
    .catch(err => console.log(err));

   // Obtener el botón "Guardar"
var btnGuardar = document.getElementById('btnGuardar');

// Agregar un evento clic al botón "Guardar"
btnGuardar.addEventListener('click', function(event) {
  event.preventDefault(); // Evitar envío del formulario

  // Mostrar ventana de confirmación
  var confirmar = confirm("¿Estás seguro de guardar esta venta?");

  // Si el usuario confirma
  if (confirmar) {
    // Aquí puedes agregar el código para guardar la venta
    console.log("Guardando venta...");
    // ...
  } else {
    // Si el usuario cancela
    console.log("Venta cancelada");
  }
});