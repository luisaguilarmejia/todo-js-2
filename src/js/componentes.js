import {Todo} from '../classes';
import {todoList} from '../index';


// Referencias en el HTML
const divTodoList   = document.querySelector('.todo-list');
const txtInput      = document.querySelector('.new-todo');
const btnBorrar     = document.querySelector('.clear-completed');
const ulFiltros     = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');


// Método que permita crear en el HTML el Todo
export const crearTodoHtml = (todo) =>{

    const htmlTodo = `
    <li class="${ (todo.completado) ? 'completed' : '' }" data-id="${ todo.id }">
			<div class="view">
				<input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : ''}>
				<label>${todo.tarea} </label>
				<button class="destroy"></button>
			</div>
			<input class="edit" value="Create a TodoMVC template">
	</li> `;

    //Crear el elemento HTML
    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    divTodoList.append(div.firstElementChild);

    return div.firstElementChild;

}


// Eventos
//keyup - cuando la persona suelta la tecla
txtInput.addEventListener('keyup', (event ) => {

    //if( event.keyCode === 13 && txtInput.value.length > 0 ){ // ejeta sino se ignora
        if(event.key === 'Enter' && txtInput.value.length > 0 ){

        const nuevoTodo = new Todo(txtInput.value)
        console.log(txtInput.value);
        //Next step. Insert todo on the array 
        todoList.nuevoTodo( nuevoTodo);

        //insert into the HTML
        crearTodoHtml(nuevoTodo);

        //once the data was inserted - we clean the txt
        txtInput.value = '';

    }

});


divTodoList.addEventListener('click', (event) => {
    const nombreElemento = event.target.localName; // input, label, button
    const todoElemento  = event.target.parentElement.parentElement;
    const todoId        = todoElemento.getAttribute('data-id');

    if( nombreElemento.includes('input')){ // Click en el check
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');
    }else if( nombreElemento.includes('button')){ // Hay que borrar el todo

        todoList.eliminarTodo(todoId); // se elimina del array
        divTodoList.removeChild( todoElemento);

    }
});

btnBorrar.addEventListener('click', () => {
    todoList.eliminarCompletados();

    //borrar de abajo hacia arriba
    for(let i = divTodoList.children.length -1;  i>=0; i--){
        const elemento = divTodoList.children[i];
        
        if(elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);

        }

    }
});

ulFiltros.addEventListener('click', (event) => {
    const filtro = event.target.text;
    if(!filtro){ //si no tiene nada / si no existe se hace un return
        return;
    }

    anchorFiltros.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');

    for(const elemento of divTodoList.children){
        
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed'); //si contiene el completed

        switch(filtro){
            case 'Pendientes' : 
            if(completado){
                elemento.classList.add('hidden');
            }
            break;

            case 'Completados' : 
            if(!completado){ // Si, NO está completado
                elemento.classList.add('hidden'); // Le agrego la clase hidden
            }
            break;

        }
    }

});