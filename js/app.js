// Variables
const formulario = document.querySelector('#enviar-mail');
const enviarBtn = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');

// Variables de campos
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//EventListeners

eventListeners()
function eventListeners(){
    document.addEventListener('DOMContentLoaded', iniciarApp);
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);
    formulario.addEventListener('submit', enviarEmail);
    btnReset.addEventListener('click', resetearFormulario);

}



// Funciones
function iniciarApp(){
    //console.log('iniciando app...')
    enviarBtn.disabled = true;
    enviarBtn.classList.add('cursor-not-allowed', 'opacity-50');
}

function validarFormulario(e){
    //console.log(e.target.value.length);
    if(e.target.value.length > 0){
        //console.log('validacion correcta');
            const error = document.querySelector('p.error');
            if(error){
                error.remove();
            }
        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');

    }
    else{
        //console.log('Todos los campos son obligatorios');
        
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');
        mostrarError('Todos los campos son obligatorios');

    }
    if(e.target.type === 'email'){
        //console.log('hay que validar de forma diferente');
        
        if (er.test(e.target.value)){ //ejecuta la búsqueda de una ocurrencia entre una expresión regular y una cadena especificada.
        //console.log('email valido');
            const error = document.querySelector('p.error');
            if(error){
                error.remove();
            }
            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');
        }
        else{
            //console.log(' email no valido');
            
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');
            mostrarError('email no valido');
        }

    }
    if(er.test(email.value) && asunto.value !== '' && mensaje.value !== ''){
        //console.log('validacion aprovada');
        enviarBtn.disabled = false;
        enviarBtn.classList.remove('cursor-not-allowed', 'opacity-50');
    }
}
function mostrarError(mensaje){
    //console.log('todos los campos son obligatorios');
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500','p-3', 'mt-5', 'text-center', 'error');
    const errores = document.querySelectorAll('.error');

    if (errores.length === 0){
        formulario.appendChild(mensajeError);
    }
}

function enviarEmail(e){
    e.preventDefault();
    console.log('enviando...');
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';
    setTimeout(() =>{
        spinner.style.display = 'none';
        const parrafo = document.createElement('p');
        parrafo.textContent = 'Email enviado correctamente';
        parrafo.classList.add('text-center', 'my-5', 'p-2', 'bg-green-500', 'text-white', 'font-bold', 'uppercase');
        formulario.insertBefore(parrafo, spinner);
        
        
        setTimeout(() =>{
            parrafo.remove();
            resetearFormulario();
        },5000);

    },3000);
}

function resetearFormulario(){
    formulario.reset();
    iniciarApp();

}