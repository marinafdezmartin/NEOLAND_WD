const cuerpo = document.getElementById("cuerpo");

const botonConsola = document.getElementById("boton-consola");

botonConsola.addEventListener("click", () => {
  // Buscamos si la imagen ya existe dentro del cuerpo
  const imagen = cuerpo.querySelector("#mi-imagen");

  if (imagen) {
    imagen.remove();
    console.log("Quitando imagen...");
  } else {
    const nuevaImagen = document.createElement("img");
    nuevaImagen.id = "mi-imagen";
    nuevaImagen.src =
      "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png";

    nuevaImagen.style.width = "300px";

    cuerpo.appendChild(nuevaImagen);
    console.log("Poniendo imagen...");
  }
});

// EVENTO CLICK
// botonConsola.addEventListener("click", () => {
//   const imagen = document.createElement("img");
//   imagen.src =
//     "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original";
//   imagen.style.width = "300px";

//   cuerpo.appendChild(imagen);
// });
