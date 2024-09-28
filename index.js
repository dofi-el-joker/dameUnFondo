let indiceSlider = 0;
let fondosSlider = ['eb7ed8614201508b4b7eefcc1f000cec.jpeg','Mesa de trabajo 1@4x-100.jpg', '917625.png', 'e41d887798f3e39905b15c567f430b09.jpeg'];

cargarIndice();
let recorrerSlider = setInterval(cambioSlider, 3000);

document.body.addEventListener('click', (e)=>{if(window.getComputedStyle(document.querySelector('.formulario')).getPropertyValue('visibility')=='visible'){document.querySelector('.formulario').style.visibility='hidden'; document.querySelectorAll('.username label').forEach(e=>e.style.transition='.0s')}});
document.querySelector('.formulario').addEventListener('click', (e)=>{e.stopPropagation()})

async function cambioSlider(nextOrPrev=1, indiceSolicitado=-1){
    img = document.querySelector('.slider__img');
    if(indiceSlider!=indiceSolicitado){ //para que no se haga la animacion cuando se presiona el indice que ya esta seleccionado
        if(nextOrPrev==1 || indiceSolicitado>indiceSlider){
            img.style.marginRight='50px';
        }else{
            img.style.marginLeft='50px';
        }
        img.style.opacity='0';
        await esperarAnimacion(nextOrPrev, indiceSolicitado);
        img.style.opacity='1';
        img.style.transition='.5s';
        clearInterval(recorrerSlider);
        recorrerSlider = setInterval(cambioSlider, 3000);
    }
}

function esperarAnimacion(nextOrPrev, indiceSolicitado){
    let indiceOld = indiceSlider;
    if(nextOrPrev==1 || indiceSolicitado>indiceSlider){ //si el cambio es hacia adelante
        if(indiceSolicitado!=-1){ //si hay indice solicitado
            indiceSlider=indiceSolicitado;
        }else{
            if(indiceSlider+1==fondosSlider.length){ //si es el ultimo elemento y quiere uno siguiente  se regresa al primer elemento
                indiceSlider=0;
            }else{
                indiceSlider++;
            }
        }
    }else{  //si es hacia atras
        if(indiceSolicitado!=-1){
            indiceSlider=indiceSolicitado;
        }else{
            if(indiceSlider-1<0){  //si es el primer elemento y quiere uno previo  se regresa al ultimo elemento
                indiceSlider=fondosSlider.length-1;
            }else{
                indiceSlider--;
            }
        }
    }
    actualizarIndice(indiceOld, indiceSlider);
    return new Promise(resolve=>{
        setTimeout(()=>{
            img.style.transition='0s';
            img.style.marginRight='0';
            img.style.marginLeft='0';
            img.src='fondos/'+fondosSlider[indiceSlider];
            resolve();
        }, 300);
    });
}

function cargarIndice(){
    let contenedor = document.querySelector('.slider__indice');
    for(let i=0; i<fondosSlider.length; i++){
        let indice = document.createElement('DIV');
        indice.setAttribute('class', 'indice__ball');
        indice.setAttribute('onclick', 'cambioSlider(0, '+i+')');
        contenedor.appendChild(indice);
    }
    let indice = document.querySelectorAll('.indice__ball')[indiceSlider];
    indice.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24"><path fill="var(--color1)" d="M6 4h14v2h2v6h-8v2h6v2h-4v2h-2v2H2V8h2V6h2zm2 6h2V8H8z"/></svg>';
    indice.classList.add('indice__ball-active');
}

function actualizarIndice(indiceOld, indiceNew){
    let indiceN = document.querySelectorAll('.indice__ball')[indiceNew];
    indiceN.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24"><path fill="var(--color1)" d="M6 4h14v2h2v6h-8v2h6v2h-4v2h-2v2H2V8h2V6h2zm2 6h2V8H8z"/></svg>';
    indiceN.classList.add('indice__ball-active');
    let indiceO = document.querySelectorAll('.indice__ball')[indiceOld];
    indiceO.innerHTML='';
    indiceO.classList.remove('indice__ball-active');
}

function abrirLogin(event){
    event.stopPropagation();
    document.querySelectorAll('.username label').forEach(e=>e.style.transition='.5s')
    document.querySelector('.formulario').style.visibility='visible';
}

function like(){
    document.querySelector('.contHearth').innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" onclick="dislike()" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 12 12" style="enable-background:new 0 0 12 12;" xml:space="preserve">
    <path fill="#f00" d="M4.5,1h-2v1h-1v1h-1v3h1v1h1v1h1v1h1v1h1v1h1v-1h1V9h1V8h1V7h1V6h1V3h-1V2h-1V1h-2v1h-1v1h-1V2h-1V1z M4.5,2v1h1v1h1V3h1V2  h2v1h1v3h-1v1h-1v1h-1v1h-1v1h-1V9h-1V8h-1V7h-1V6h-1V3h1V2H4.5z"/>
    <polyline fill="#f00" points="1.5,3 10.5,3 10.5,6 1.5,6 "/>
    <polyline fill="#f00" points="2.5,3 2.5,2 4.5,2 4.5,3 "/>
    <polyline fill="#f00" points="7.5,3 7.5,2 9.5,2 9.5,3 "/>
    <polyline fill="#f00" points="2.5,7 9.5,7 9.5,6 2.5,6 "/>
    <polyline fill="#f00" points="3.5,8 8.5,8 8.5,7 3.5,7 "/>
    <polyline fill="#f00" points="4.5,9 7.5,9 7.5,8 4.5,8 "/>
    <polyline fill="#f00" points="5.5,10 6.5,10 6.5,9 5.5,9 "/>
    </svg>`;
    document.querySelector('.contHearth').style.animationName="cora";
}

function dislike(){
    document.querySelector('.contHearth').innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" class="cora" onclick="like()" viewBox="0 0 24 24"><path fill="black" d="M9 2H5v2H3v2H1v6h2v2h2v2h2v2h2v2h2v2h2v-2h2v-2h2v-2h2v-2h2v-2h2V6h-2V4h-2V2h-4v2h-2v2h-2V4H9zm0 2v2h2v2h2V6h2V4h4v2h2v6h-2v2h-2v2h-2v2h-2v2h-2v-2H9v-2H7v-2H5v-2H3V6h2V4z"/></svg>';
    document.querySelector('.contHearth').style.animationName="";
}

function addFondo(){
    
}

function ventanaModal(){
    let fondoMsg = document.createElement('DIV');
    fondoMsg.setAttribute('class', 'fondoMsg');
    document.body.appendChild(fondoMsg);
    fondoMsg.addEventListener('click', (e)=>{
        e.target.remove();
    });
    let ventana = document.createElement('DIV');
    ventana.setAttribute('class', 'ventana');
    fondoMsg.appendChild(ventana);
    ventana.addEventListener('click', (e)=>{e.stopPropagation()});
    ventana.innerHTML='hola';
}