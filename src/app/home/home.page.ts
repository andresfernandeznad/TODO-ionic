import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../interfaces/todo';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  todos: Todo[] = [];
  constructor(private todoService: TodoService, private alertController: AlertController, private navController: NavController) {
  }

  ngOnInit(): void {
  }

  ionViewWillEnter() {
    this.todoService.getTodos().then(
      data => this.todos = data //El getTodo devuelve una promesa cuando se cumple la promesa entra al método, mete los datos en el data y una vez esté lo asignamos.
    ); //Accedo al servicio (donde se guardan los datos) y esto me devuelve un array de todos que se guarda aquí en esta clase
    console.log(this.todos);
  }

  async deleteDialog(title: string, id: number) {
    const alert = await this.alertController.create({
      header: 'Borrar tarea',
      message: '¿Estás seguro que quieres borrar la tarea <strong>' + title + '</strong>?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Cancelar');
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            this.todoService.deleteTodo(id).then(() => this.todoService.getTodos().then(
              data => this.todos = data
              )
            );
            console.log('Borrar');
          }
        }
      ]
    });
    await alert.present();
  }

  editTodo(id: number) {
    this.navController.navigateForward('/edit/' + id);
  }
}
