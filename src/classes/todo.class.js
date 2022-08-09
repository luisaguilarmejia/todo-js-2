export class Todo{

    static fromJson({id, tarea, completado, creado}){

        const tempTodo = new Todo( tarea);
        tempTodo.id         = id;
        tempTodo.completado = completado;
        tempTodo.creado     = creado;
        
        return tempTodo;
    }
    
    constructor( tarea ){ //aprender PHP, JS, comprar leche (tarea)

        this.tarea     = tarea;
        this.id        = new Date().getTime(); /// 12345648 (Identificador único de la tarea)
        this.completado= false;
        this.creado    = new Date();

    }

    imprimirClase(){
        console.log(`${this.tarea} - ${this.id}`);
    }
}