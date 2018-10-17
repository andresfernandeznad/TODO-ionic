import { Component, OnInit } from '@angular/core';
import { Todo } from '../interfaces/todo';
import { TodoService } from '../services/todo.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.page.html',
  styleUrls: ['./edit-todo.page.scss'],
})
export class EditTodoPage implements OnInit {

  todo: Todo;
  edit: boolean = false;

  val : any[];

  constructor(private todoService: TodoService, private nav: NavController, private activatedRoute: ActivatedRoute) {
    this.todo = {id: this.todoService.todoCounter, title: '', description: '', 
    rating: [{nombre :'star-outline', id:0},{nombre :'star-outline', id:1}, {nombre :'star-outline', id:2}], valor: 0};
   }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(id);
    this.todoService.rating = this.val;
    this.val = [{nombre :'star-outline', id:0},{nombre :'star-outline', id:1}, {nombre :'star-outline', id:2}];
    if (id) {
      this.edit = true;
      this.todo = this.todoService.getTodoById(parseInt(id));
      this.val = this.todo.rating;
      console.log(this.todo);
    }    
  }

  saveTodo(todo: Todo) {
    if(this.edit) {
      this.todoService.saveTodo(this.todo).then(
        () => this.nav.goBack(true),
        (error) => console.error('Error al guardarlo', error)
      );
    } else {
      
      this.todo.id = this.todoService.todoCounter;
      console.log(this.todoService.todoCounter);
      this.todoService.newTodo(this.todo).then(
        () => this.nav.goBack(true),
        (error) => console.error('Error al guardarlo', error)
      );
    }
  }

  valorar(num: any) {
    if (this.val[num].nombre==='star-outline') {
      if (num == 1) {
        this.val[0].nombre='star';
        this.val[1].nombre='star';
      } else if (num == 2) {
        this.val[0].nombre='star';
        this.val[1].nombre='star';
        this.val[2].nombre='star';
      }
      this.val[num].nombre='star';
      this.todo.rating = this.val;
      
    } else {
      if (num == 1) {
        this.val[2].nombre='star-outline';
        this.val[1].nombre='star-outline';
      } else if (num == 0) {
        this.val[0].nombre='star-outline';
        this.val[1].nombre='star-outline';
        this.val[2].nombre='star-outline';
      } else {
        this.val[0].nombre='star-outline';
      }
      this.todo.rating = this.val;
    }
    this.todo.valor = num;
  }
}
