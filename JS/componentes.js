
var divp=document.getElementById("principal");
const comp1= document.createElement('div');
comp1.id='comp1';
comp1.innerHTML=`
<table id="tabla-menu" class="Hover">
<tr>
    <td class="contenedor-centrado "><button onclick="altaProductos()" id='boton-menu' >ALTA DE PRODUCTO</button></td>
    </tr>

    <tr class='fila-menu'>
        <td class="contenedor-centrado "><button onclick="listarProductos()" id='boton-menu' >LISTADO DE PRODUCTOS</button></td>
    </tr>

    <tr class='fila-menu'>
        <td class="contenedor-centrado "><button onclick="modificarProductos()" id='boton-menu' >MODIFICAR PRODUCTOS</button></td>
    </tr>

    <tr class='fila-menu'>
        <td class="contenedor-centrado "><a href="eliminar.html">ELIMINAR PRODUCTOS</a></td>
    </tr>
    
    <tr class='fila-menu'>
        <td class="contenedor-centrado "><button onclick="buscarProductos()" id='boton-menu'>BUSQUEDA DE PRODUCTOS</button></td>
    </tr>
   
</table>
`
divp.appendChild(comp1);

/*-------------------------------------LISTAR PRODUCTOS ----------------------------------*/ 

function listarProductos(){
const comp1= document.getElementById('comp1');
comp1.style.display='none';

var divp=document.getElementById("principal");
const comp2= document.createElement('div');
comp2.id='comp2'

comp2.innerHTML=`
<h1 class="inventario">Listado de productos:</h1>

<a href="inventario.html" id='boton-volver2'>Volver al menu</a>


<table>
        <thead>
            <tr>
                <th>Id_producto</th>
                <th>Descripción</th>
                <th>Stock</th>
                <th>Precio</th>
                <th>Categoria</th>
                <th>Imagen</th>
            </tr>
        </thead>
        <tbody id="tablaProductos">
        </tbody>
</table>




`

divp.appendChild(comp2);

const URL = "https://ruthvac.pythonanywhere.com/"


fetch(URL + 'productos')
    .then(function (response) {
        if (response.ok) {
            return response.json(); 
        } else {
            throw new Error('Error al obtener los productos.');
        }
    })
    .then(function (data) {
        var tablaProductos = document.getElementById('tablaProductos');

        data.forEach(function (producto) {
            var fila = document.createElement('tr');
            fila.innerHTML =`
                <td> ${producto.id_producto}</td>
                <td>${producto.descripcion}</td>
                <td>${producto.stock}</td>
                <td>$${producto.precio}</td>
                <td>${producto.categoria}</td>
                <td><img src="imagenes/${producto.imagen}"></td>
                `
            tablaProductos.appendChild(fila);
            
        });
    })
    
    .catch(function (error) {
       alert('Error al obtener los productos.');
    });


}

/*-----------------------------------ALTA PRODUCTO---------------------------------------------*/


function altaProductos(){

const comp1= document.getElementById('comp1');
comp1.style.display='none';


var divp=document.getElementById("principal");
const comp3= document.createElement('div');
comp3.id='comp3'

comp3.innerHTML=`
<h1 class="inventario">Agregar productos al inventario:</h1>
   
    <form id="Agregar-productos">
        
    
        <label for="descripcion">Descripción:</label>
        <input type="text" id="descripcion" name="descripcion" required onKeyUp="document.getElementById(this.id).value=document.getElementById(this.id).value.toUpperCase()"><br>

        <label for="stock">Stock:</label>
        <input type="number" id="stock" name="stock" required><br>

        <label for="precio">Precio:</label>
        <input type="number" step="0.01" id="precio" name="precio" required><br>

        <label for="imagen">Imagen:</label>
        <input type="text" id="imagen" name="imagen"><br>

        <select name="categoria" id="categoria"> 
            <option value="INFORMATICA">Informatica</option>
            <option value="ACCESORIOS">Accesorios</option>
            <option value="GAMER">Gamer</option>
            <option value="VARIOS">Varios</option>
        </select>
        
        
        <button type="submit" id="boton-agregar" class="Hover">Agregar Producto</button>
        <a href="inventario.html" id='boton-volver'>Volver al menu</a>
        
    </form>


`
divp.appendChild(comp3);

const URL = "https://ruthvac.pythonanywhere.com/"

document.getElementById('Agregar-productos').addEventListener('submit', function (event) {
    event.preventDefault(); 

    
    var descripcion = document.getElementById('descripcion').value;
    var stock= document.getElementById('stock').value;
    var precio = document.getElementById('precio').value;
    var imagen= document.getElementById('imagen').value;
    var categoria=document.getElementById('categoria').value;

    var producto = {
        descripcion: descripcion,
        stock: stock,
        precio: precio,
        imagen: imagen + '.jpg',
        categoria:categoria
    };
    console.log(producto)
    
    fetch(URL + 'productos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(producto)
    })
        .then(function (response) {
          
            if (response.ok) {
                return response.json(); 
            } else {
               throw new Error('Error al agregar el producto.');
            }
        })
        .then(function (data) {
            alert('Producto agregado correctamente.');
            
            document.getElementById('descripcion').value = "";
            document.getElementById('stock').value = "";
            document.getElementById('precio').value = "";
            document.getElementById('imagen').value = "";
        })
        .catch(function (error) {
            alert('Error al agregar el producto.');
        });
})


}

/*---------------------------------MODIFICAR PRODUCTO----------------------------------------*/ 

function modificarProductos(){

const comp1= document.getElementById('comp1');
comp1.style.display='none';
    
var divp=document.getElementById("principal");
const comp4= document.createElement('div');
comp4.id='comp4'
    
comp4.innerHTML=`

<h1 class="inventario">Modificar productos del inventario:</h1>
    
    <form id="formulario-modif">
        <label for="id_producto">Id del producto a modificar:</label>
        <input type="text" id="id_producto" name="id_producto" required><br>
        <button type="submit" id="boton-modificar">Modificar Producto</button> 
        <a href="inventario.html" id='boton-volver'>Volver al menu</a>
    </form>

    <div id="datosProducto" style="display: none;">
        
        <form id="formularioModificar">
            <h3>Datos del producto:</h3>
            <br>
            <label for="nueva_descripcion">Descripción:</label>
            <input type="text" id="nueva_descripcion" name="nueva_descripcion" required onKeyUp="document.getElementById(this.id).value=document.getElementById(this.id).value.toUpperCase()"><br>

            <label for="nuevo_stock">Stock:</label>
            <input type="number" id="nuevo_stock" name="nuevo_stock" required><br>

            <label for="nuevo_precio">Precio:</label>
            <input type="number" step="0.01" id="nuevo_precio" name="nuevo_precio" required><br>

            <select name="nueva_categoria" id="nueva_categoria"> 
                <option value="INFORMATICA">Informatica</option>
                <option value="ACCESORIOS">Accesorios</option>
                <option value="GAMER">Gamer</option>
                <option value="VARIOS">Varios</option>
            </select>

            <label for="nueva_imagen">Imagen:</label>
            <input type="text" id="nueva_imagen" name="nueva_imagen"><br>
            
            <button type="submit" id='guardar-cambios' class="Hover">Guardar Cambios</button>
            <a href="inventario.html" id='boton-volver' class="Hover">Cancelar</a>
            
        </form>
    </div>`

divp.appendChild(comp4);

const URL = "https://ruthvac.pythonanywhere.com/";

       
        document.getElementById('formulario-modif').addEventListener('submit', function (event) {
            event.preventDefault(); 

            
            var id_producto = document.getElementById('id_producto').value;

           
            fetch(URL + 'productos/' + id_producto)
                .then(function (response) {
                    if (response.ok) {
                        return response.json(); 
                    } else {
                        throw new Error('Error al obtener los datos del producto.');
                    }
                })
                .then(function (data) {
                    document.getElementById('nueva_descripcion').value = data.descripcion;
                    document.getElementById('nuevo_stock').value = data.stock;
                    document.getElementById('nuevo_precio').value = data.precio;
                    document.getElementById('nueva_categoria').value = data.categoria;
                    document.getElementById('nueva_imagen').value = data.imagen;
                    
                    
                    document.getElementById('formulario-modif').style.display = 'none';
                    document.getElementById('datosProducto').style.display = 'block';
                    
                })
                .catch(function (error) {
                    
                    alert('Error al obtener los datos del producto.');
                });
        });

        
        document.getElementById('formularioModificar').addEventListener('submit', function (event) {
            event.preventDefault(); 
           
            var id_producto = document.getElementById('id_producto').value;
            var descripcion = document.getElementById('nueva_descripcion').value;
            var stock= document.getElementById('nuevo_stock').value;
            var precio = document.getElementById('nuevo_precio').value;
            var categoria = document.getElementById('nueva_categoria').value;
            var imagen = document.getElementById('nueva_imagen').value;

           
            var producto = {
                id_producto: id_producto,
                descripcion: descripcion,
                stock: stock,
                precio: precio,
                categoria: categoria,
                imagen: imagen 
            };

            
            fetch(URL + 'productos/' + id_producto, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(producto)
            })
                .then(function (response) {
                    if (response.ok) {
                        return response.json(); 
                    } else {
                        throw new Error('Error al guardar los cambios del producto.');
                    }
                })
                .then(function (data) {
                    alert('Cambios guardados correctamente.');
                    location.reload(); 
                })
                .catch(function (error) {
                    
                    alert('Error al guardar los cambios del producto.');
                })
        });







}


/*--------------------------------------BUSCAR PRODUCTOS-------------------------------------*/


function buscarProductos(){
    const comp1= document.getElementById('comp1');
    comp1.style.display='none';
    
    var divp=document.getElementById("principal");
    
    var comp5= document.createElement('div');
    
    comp5.innerHTML=`
    <h1 class="inventario">Busqueda de productos:</h1>
    
    <form id='form-filtrar'>

    <label for="cat">Introduzca el producto/categoria que desea buscar:</label>
    <input type="text" id="cat" name="cat" onKeyUp="document.getElementById(this.id).value=document.getElementById(this.id).value.toUpperCase()"><br>
    
    <a href="inventario.html" id='boton-volver' class="Hover">Volver al menu</a>
    </form>

    <table>
            <thead>
                <tr>
                    <th>Id_producto</th>
                    <th>Descripción</th>
                    <th>Stock</th>
                    <th>Precio</th>
                    <th>Categoria</th>
                    <th>Imagen</th>
                </tr>
            </thead>
            <tbody id="tablaProductos">
            </tbody>
    </table>
   
    `
    
    divp.appendChild(comp5);

    const URL = "https://ruthvac.pythonanywhere.com/"



    fetch(URL + 'productos')
    .then(function (response) {
        if (response.ok) {
            return response.json(); 
        } else {
            throw new Error('Error al obtener los productos.');
        }
    })

    
    .then(function (data) {
        var tablaProductos = document.getElementById('tablaProductos');
        
        data.forEach(function (producto) {
            
            
            
            
            var fila = document.createElement('tr');
            fila.innerHTML =`
                <td> ${producto.id_producto}</td>
                <td>${producto.descripcion}</td>
                <td>${producto.stock}</td>
                <td>$${producto.precio}</td>
                <td>${producto.categoria}</td>
                <td><img src="imagenes/${producto.imagen}"></td>
                `
            tablaProductos.appendChild(fila);
              
            
            var cat = document.getElementById('cat');

            buscar= function(){
             texto= cat.value;
             
             
             var r=0
             while(row = tablaProductos.rows[r++])
             {
               if ( row.innerText.indexOf(texto) !== -1 )
                 row.style.display = null;
               else
                row.style.display = 'none';
               }
           }
       
           cat.addEventListener('keyup', buscar);
         })
            
            
        });
    
   



}

    
    
    
    




