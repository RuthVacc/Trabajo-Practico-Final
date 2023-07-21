function validarFormulario() {
var nomApe= document.getElementById("nombreapellido").value.trim();
var correo= document.getElementById("correoelectronico").value.trim();
var tel= document.getElementById("telefono").value.trim();     


if (nomApe==="" || correo==="" || tel==="" ){
    alert ("Por favor, complete todos los campos del formulario.");
    return false;
}


for (var i = 0; i < nomApe.length; i++) {
    var charCode = nomApe.charCodeAt(i);
    if (!((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || charCode === 32)) {
      alert("El campo 'Nombre y Apellido' solo puede contener caracteres alfabéticos y espacios.");
      return false;
    }
}


valor=validarNum(tel);
if (valor ==""){
    alert("Por favor, ingrese un valor numerico en el campo 'Telefono'")
    return false;
}


if (!validarEmail(correo)) {
    alert('Por favor ingrese un correo electrónico válido.');
    return false;
} 


alert("Formulario enviado correctamente.");
return true;




}


function validarNum(valor){
    valor= parseInt(valor)

            
    if (isNaN(valor)) {
                
        return ""
    } else {
                
        return valor
            }
}


function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,7}$/
    return regex.test(email)
}




