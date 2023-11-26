function mostrarImagenSeleccionada() {
    var archivoInput = document.getElementById('archivoInput');
    var imagenSeleccionada = document.getElementById('imagenSeleccionada');
    
    var archivo = archivoInput.files[0];
    if (archivo) {
      var lector = new FileReader();

      lector.onload = function(e) {
        imagenSeleccionada.src = e.target.result;
      };

      lector.readAsDataURL(archivo);
    } else {
      imagenSeleccionada.src = '../../public/img/logo_fondo.png';
    }
  }

  export { mostrarImagenSeleccionada }