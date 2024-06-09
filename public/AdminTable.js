async function loadData() {

  try {
    var result = await fetch("https://apiteinda.onrender.com/shoes")
  } catch (err) {
    return err
  }

  return result;
}


loadData()
  .then(r => r.json())
  .then(data => {
    const tBody = document.querySelector("#tBody")
    data.data.forEach(prj => {
      const row = document.createElement('tr')
      console.log(prj.Brand)
      const colBrand = document.createElement('td')
      colBrand.appendChild(document.createTextNode(prj.Brand))
      row.append(colBrand)

      const colModel = document.createElement('td')
      colModel.appendChild(document.createTextNode(prj.Model))
      row.append(colModel)

      const colColor = document.createElement('td')
      colColor.appendChild(document.createTextNode(prj.Color))
      row.append(colColor)

      const colSize = document.createElement('td')
      colSize.appendChild(document.createTextNode(prj.Size))
      row.append(colSize)

      const colPrice = document.createElement('td')
      colPrice.appendChild(document.createTextNode(prj.Price))
      row.append(colPrice)

       // Celda de imagen
       const colImage = document.createElement('td');
       const imgElement = document.createElement('img');
       imgElement.src = prj.Image;
       imgElement.alt = `Imagen de ${prj.Brand} ${prj.Model}`;
       imgElement.style.width = '50px';  // Ajusta el tamaño según tus necesidades
       colImage.appendChild(imgElement);
       row.append(colImage);

      const colStock = document.createElement('td')
      colStock.appendChild(document.createTextNode(prj.Price))
      row.append(colStock)

           // Nueva celda para los botones de acción
           const colActions = document.createElement('td');

           // Botón de editar
           const editBtn = document.createElement('a');
           editBtn.href = `/edit/${prj.id}`;  // Asumiendo que prj tiene un id
           editBtn.className = 'btn btn-primary btn-sm';
           editBtn.innerHTML = '<i class="fas fa-edit"></i>';
           colActions.appendChild(editBtn);
     
           // Espacio entre botones (opcional)
           colActions.appendChild(document.createTextNode(' '));
     
           // Botón de eliminar
           const deleteBtn = document.createElement('a');
           deleteBtn.href = `/delete/${prj.id}`;  // Asumiendo que prj tiene un id
           deleteBtn.className = 'btn btn-danger btn-sm';
           deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
           colActions.appendChild(deleteBtn);
     
           // Agregar la celda de acciones a la fila
           row.append(colActions);
     
    
   

     
      





      tBody.appendChild(row)
    });
  })
  .catch(err => console.log(err))
