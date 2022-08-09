import './styles.css';

import {Todo, TodoList} from './classes/index.js';
import { crearTodoHtml } from './js/componentes.js';

export const todoList   = new TodoList();

todoList.todos.forEach( todo => crearTodoHtml(todo));

console.log('todos', todoList.todos);