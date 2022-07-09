const d=document;
const carrito=d.getElementById('carrito');
const template=d.getElementById('template');
const footer=d.getElementById('footer');
const templatefooter=d.getElementById('templateFooter');
const fragment=d.createDocumentFragment();
const fragment2=d.createDocumentFragment();
const aviso=d.querySelector('#alerta');
const confirmacion=d.querySelector('#confirm');
const articulos=d.querySelectorAll(".card .btn-primary");
const recibo=d.querySelector('#recibo');
const templaterecibo=d.querySelector('#templaterecibo');
const totalrecibo=d.querySelector('#totalrecibo');
let carritoArray=[];
//Delegamos eventos
document.addEventListener('click',(e) => {
    //Si damos click en agregar en alguno de los productos--realizamos la función de agregar al carrito
    if(e.target.matches(".card .btn-primary")){
        agregarCarrito(e);
        alerta.classList.add('d-none');
        console.log(carritoArray);
    }
    //agregar el producto en el carrit0
    if (e.target.matches(".list-group-item .btn-success")) {
        btnAumentar(e);
    }
    //quitar una unidad del producto en el carrito
    if (e.target.matches(".list-group-item .btn-danger")) {
        btnDisminuir(e);
    }
    if(e.target.matches(".card .btn-end")){
        btnFinalizarCompra(e);
        console.log(carritoArray);
    }
})
//Funcion que nos permite agregar productos al carrito e ir imprimiendolas
const agregarCarrito = (e) => {
        //Se añade el producto al hacer click en el boton agregar con sus especificaciones
        producto={
            titulo: e.target.dataset.fruta,
            id: e.target.dataset.fruta,
            cantidad:1,
            precio:parseInt(e.target.dataset.precio), //pasamos el precio ubicado en el data del elemento y lo pasamos a entero para ser usado luego en el total
            logo:e.target.dataset.logo
        }
        //se busca si el producto ya esta en el carrito
        const indice=carritoArray.findIndex((item)=>(item.titulo===producto.titulo)); //finindex devuelve -1 en caso de no encontrar el producto
        if(indice===-1){
            carritoArray.push(producto);
        }else{
            carritoArray[indice].cantidad+=1;
        }
        pintarCarrito();
}
const pintarCarrito = () =>{
    carrito.textContent = "";
    //Por cada producto que haya en el arrayCarrito le diseñamos un template y lo añadimos al carrito
    carritoArray.forEach((item)=>{
        const clone = template.content.cloneNode(true);
        clone.querySelector(".text-white .lead").textContent = item.titulo;
        clone.querySelector(".rounded-pill").textContent = item.cantidad;
        clone.querySelector("div .lead span").textContent = item.precio * item.cantidad;
        clone.querySelector("div .btn-success").dataset.id=item.id;
        clone.querySelector("div .btn-danger").dataset.id=item.id;
        fragment.appendChild(clone);
})
    carrito.appendChild(fragment);
    pintarFooter();
}
//Función para imprimir el total de los productos de los productos comprados 
const pintarFooter = () =>{
    footer.textContent='';
    const total=carritoArray.reduce((acumulado, nuevo)=> acumulado+(nuevo.cantidad*nuevo.precio),0);
    const clone=templatefooter.content.cloneNode(true);
    clone.querySelector('.lead  span').textContent=total;
    footer.appendChild(clone);
}
const btnAumentar = (e) => {
    alerta.classList.add('d-none');
    // console.log(e.target.dataset.id);
    carritoArray = carritoArray.map((item) => {
        if (item.id === e.target.dataset.id) {
            item.cantidad++;
        }
        return item;
    });
    pintarCarrito();
};

const btnDisminuir = (e) => {
    // console.log(e.target.dataset.id);
    carritoArray = carritoArray.filter((item) => {
        // console.log(item);
        if (item.id === e.target.dataset.id) {
            if (item.cantidad > 0) {
                item.cantidad--;
                // console.log(item);
                if (item.cantidad === 0) return;
                return item;
            }
        } else {
            return item;
        }
    });
    pintarCarrito();
};

const imprimirRecibo=() => {
    recibo.textContent='';
    carritoArray.forEach((item)=>{
        const clone = templaterecibo.content.cloneNode(true);
        clone.querySelector("#uni").textContent = item.cantidad;
        clone.querySelector("#name").textContent = item.titulo+" "+item.logo;
        clone.querySelector("#valor span").textContent = item.precio * item.cantidad;
        fragment2.appendChild(clone);
    });  
    recibo.appendChild(fragment2);
}
const btnFinalizarCompra = (e) => {
    console.log("funciono");
    console.log(carritoArray);
    if(carritoArray.length===0){
        alerta.classList.remove('d-none');
    }else{
        alerta.classList.add('d-none');
        confirmacion.classList.remove('d-none');
        carrito.classList.add('d-none');
        footer.classList.add('d-none');
        articulos.forEach((item)=>{
            item.classList.add('d-none');
        })
        recibo.classList.remove('d-none');
        totalrecibo.classList.remove('d-none');
        (d.querySelector('#encabezado')).classList.remove('d-none')
        imprimirRecibo();
        const total=carritoArray.reduce((acumulado, nuevo)=> acumulado+(nuevo.cantidad*nuevo.precio),0);
        totalrecibo.querySelector('p span').textContent = total;
        d.querySelector('#msg').classList.remove('d-none');

    }
    
}