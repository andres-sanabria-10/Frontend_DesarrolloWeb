async function loadDataCard() {
    try {
        var result = await fetch("https://apiteinda.onrender.com/shoes");
    } catch (err) {
        return err;
    }
    //return result;

    const data = await result.json();

    // Llenar el filtro de marcas
    fillBrandFilter(data);


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
            checkboxInput.value = shoe._id;

            const checkboxLabel = document.createElement("label");
            checkboxLabel.className = "form-check-label";
            checkboxLabel.htmlFor = `comprarCheckbox-${shoe.id}`;
            checkboxLabel.textContent = "Comprar";

            const cantidadesDiv = document.createElement("div");
            cantidadesDiv.id = `cantidadesDiv-${shoe.id}`;
            cantidadesDiv.style.display = "none"; // Ocultar inicialmente

            const decrementButton = document.createElement("button");
            decrementButton.textContent = "-";
            decrementButton.addEventListener("click", decrementarCantidad);

            const cantidadInput = document.createElement("input");
            cantidadInput.type = "number";
            cantidadInput.value = "1";
            cantidadInput.min = "1";
            cantidadInput.max=shoe.Stock;
           
            const incrementButton = document.createElement("button");
            incrementButton.textContent = "+";
            incrementButton.addEventListener("click", incrementarCantidad);

            cantidadesDiv.appendChild(decrementButton);
            cantidadesDiv.appendChild(cantidadInput);
            cantidadesDiv.appendChild(incrementButton);

            checkboxDiv.appendChild(checkboxInput);
            checkboxDiv.appendChild(checkboxLabel);
            cardFooter.appendChild(checkboxDiv);
            cardFooter.appendChild(cantidadesDiv);

            cardElement.appendChild(cardHeader);
            cardElement.appendChild(imgElement);
            cardElement.appendChild(cardBody);
            cardElement.appendChild(cardFooter);
            cardDiv.appendChild(cardElement);
            cardContainer.appendChild(cardDiv);

            // Agregar evento al checkbox para mostrar/ocultar el div de cantidades
            checkboxInput.addEventListener("change", function() {
                if (this.checked) {
                    cantidadesDiv.style.display = "block";
                } else {
                    cantidadesDiv.style.display = "none";
                }
            });
        });
    }
    

   // Obtener el botón "Guardar"
var btnGuardar = document.getElementById('btnGuardar');



// Funciones para incrementar y decrementar la cantidad
function incrementarCantidad(event) {
    event.preventDefault(); // Evitar envío de formulario
    const input = this.parentNode.querySelector("input");
    const maxValue = parseInt(input.max);
    const currentValue = parseInt(input.value);

    if (currentValue < maxValue) {
        input.value = currentValue + 1;
    }
}

function decrementarCantidad(event) {
    event.preventDefault(); // Evitar envío de formulario
    const input = this.parentNode.querySelector("input");
    if (input.value > input.min) {
        input.value = parseInt(input.value) - 1;
    }
}


// Función para llenar el filtro de marcas
function fillBrandFilter(data) {
    const uniqueBrands = new Set();
    data.data.forEach(shoe => uniqueBrands.add(shoe.Brand));

    const homeworldFilter = document.getElementById('homeworld-filter');
    uniqueBrands.forEach(brand => {
        const option = document.createElement('option');
        option.text = brand;
        option.value = brand;
        homeworldFilter.add(option);
    });
}

// Agregar un evento al filtro de marcas para filtrar las tarjetas de productos
document.getElementById("homeworld-filter").addEventListener("change", function() {
    const selectedBrand = this.value;
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        const brand = card.querySelector(".card-header").textContent.split('/')[0].trim();
        if (selectedBrand === '' || brand === selectedBrand) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});



// Llamar a loadDataCard() para cargar los datos cuando se cargue la página
loadDataCard();