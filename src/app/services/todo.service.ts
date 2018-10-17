import { Injectable } from '@angular/core';
import { Todo } from '../interfaces/todo';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class TodoService implements Todo {
  id: number;
  title: string;
  description: string;
  valor: number;
  rating: any[] = [];
  public todoCounter: number = 0;

  todos: Todo[] = [];

  constructor(private storage: Storage) {
  }

  getTodos(): Promise<Todo[]> { //Prometo que voy a devolver un array de todos
    this.storage.get('todoCounter').then(
      data => this.todoCounter
    );
    return this.storage.get('todos').then(
      (data) => {
        if (data) this.todos = this.ordenarPorVal(data);
        return data;
      }
    );
  }

  public ordenarPorVal(data : Todo[]) {
    let aux= data;
    aux.sort(function (a,b) {
      if(a.valor < b.valor) {
        return 1;
      } 
      if (a.valor > b.valor) {
        return -1;
      }
      return 0;
    });
    return aux;
  }
  

  saveTodo(todo: Todo): Promise<any> {
    let index = this.todos.findIndex(t => t.id === todo.id);
    this.todos[index] = todo;

    return this.storage.set('todos', this.todos);
  }

  deleteTodo(id: number): Promise<any> {
    this.todos = this.todos.filter(t => t.id !== id);
    return this.storage.set('todos', this.todos);
  }

  getTodoById(id: number): Todo {
    return this.todos.find(t => t.id === id);
  }

  newTodo(todo: Todo): Promise<any> {
    this.todos.push(todo);
    this.todoCounter++;

    return this.storage.set('todos', this.todos).then(
      () => this.storage.set('todoCounter', this.todoCounter)
    );
  }
}
