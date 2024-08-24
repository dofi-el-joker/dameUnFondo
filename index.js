let indiceSlider = 0;
let fondosSlider = ['eb7ed8614201508b4b7eefcc1f000cec.jpeg','Mesa de trabajo 1@4x-100.jpg', '917625.png'];
console.log('hola desde master')

alert('hola desde la rama prueba')

cargarIndice();

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