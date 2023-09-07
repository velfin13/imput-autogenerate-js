document.addEventListener('DOMContentLoaded', function () {
    var formulario = document.getElementById('formAddCaracteristicaPregunta');
    var botonAgregarCampo = document.getElementById('agregarCampo');
    var contadorCampos = 0;
    var valoresCampos = []; // Array para almacenar los valores de los campos

    function agregarCampo() {
        var ultimoCampo = valoresCampos[contadorCampos - 1];
        
        // Verificar si el último campo no está vacío o si es el primer campo
        if (contadorCampos === 0 || ultimoCampo.trim() !== '') {
            contadorCampos++;

            var tbody = formulario.querySelector('tbody');
            var nuevaFila = document.createElement('tr');

            var etiqueta = document.createElement('td');
            etiqueta.innerHTML = '<label for="campo' + contadorCampos + '">Campo ' + contadorCampos + ':</label>';

            var entrada = document.createElement('td');
            entrada.innerHTML = '<input class="formAddCaracteristicaPregunta_imput" type="text" id="campo' + contadorCampos + '" name="campo' + contadorCampos + '">';

            nuevaFila.appendChild(etiqueta);
            nuevaFila.appendChild(entrada);

            tbody.appendChild(nuevaFila);

            // Agrega el valor actual del campo al array antes de crear uno nuevo
            valoresCampos.push('');
            
            var botonEliminar = document.createElement('td');
            botonEliminar.innerHTML = '<button type="button" class="formAddCaracteristicaPreguntaActionsbutton_eliminar">Eliminar</button>';
            botonEliminar.querySelector('.formAddCaracteristicaPreguntaActionsbutton_eliminar').addEventListener('click', function () {
                tbody.removeChild(nuevaFila);
                // Elimina el valor del campo del array cuando se elimina el campo
                valoresCampos.splice(contadorCampos - 1, 1);
                contadorCampos--;
                // Actualiza el array de valores cuando se elimina un campo
                actualizarValoresCampos();
            });

            nuevaFila.appendChild(botonEliminar);

            // Agrega un evento 'blur' para garantizar que los cambios se reflejen en el array cuando se sale del campo
            entrada.querySelector('input').addEventListener('blur', function () {
                var index = contadorCampos - 1;
                valoresCampos[index] = this.value;
                // Actualiza el array de valores cuando se edita un campo
                actualizarValoresCampos();
            });
        } else {
            alert('El último campo no puede estar vacío antes de agregar otro.');
        }
    }

    botonAgregarCampo.addEventListener('click', agregarCampo);

    // Actualiza el array de valores cuando se edita o elimina un campo
    function actualizarValoresCampos() {
        var inputs = formulario.querySelectorAll('input[type="text"]');
        inputs.forEach(function (input, index) {
            valoresCampos[index] = input.value;
        });
    }

    // Cuando se envía el formulario, valida que haya al menos un elemento en el array "valoresCampos" antes de enviarlo
    formulario.addEventListener('submit', function (e) {
        e.preventDefault();
        if (valoresCampos.length === 0 || valoresCampos.every(function (valor) { return valor.trim() === '' })) {
            alert('No se puede guardar porque no hay elementos en el array.');
        } else {
            console.log(valoresCampos);
            // Puedes hacer lo que necesites con los valores aquí, como enviarlos a un servidor o procesarlos de alguna manera.
        }
    });
});