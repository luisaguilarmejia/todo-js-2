// Va agrupar toda la lista de Todos

import {Todo} from './todo.class';

export class TodoList{

    constructor(){

        // this.todos = [];
        this.cargarLocalStorage();
    }

    nuevoTodo( todo ){
        this.todos.push(todo); // agregar el todo al arreglo de todos
        this.guardarLocalStorage();

    }

    eliminarTodo( id ){ // metodo filter
        // Regresamos un nuevo arreglo excluyendo/filtrando el todo que coincida con el ID
        this.todos = this.todos.filter( todo => todo.id != id ); 
        this.guardarLocalStorage();

    }

    marcarCompletado( id ){

        for (const todo of this.todos){

            if(todo.id == id){
                todo.completado = !todo.completado;
                this.guardarLocalStorage();
                break;
            }
        }
    }

    eliminarCompletados(){
        this.todos = this.todos.filter( todo => !todo.completado ); // Todos los que NO estén completados.
        this.guardarLocalStorage();
    }

    guardarLocalStorage(){

        localStorage.setItem('todo', JSON.stringify(this.todos) );

    }

    cargarLocalStorage(){

         this.todos = (localStorage.getItem('todo'))  // Si eso esxite, ejecuto...
                        ? this.todos = JSON.parse(localStorage.getItem('todo')) 
                        : []; //caso contrario

        this.todos = this.todos.map(obj => Todo.fromJson(obj));              

    }

}
