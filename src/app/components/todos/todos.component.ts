import { Component, OnInit } from '@angular/core';
import { take, first, map } from 'rxjs/operators';

import { TodoService } from '../../services/todo.service';
import { Todo } from '../../Todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    //this.todoService.getTodosT().then((todos) => (this.todos = todos));

    //let data = this.todoService.getTodos();
    let data = this.todoService.getTodoList();
    data.subscribe((p) => {
      //console.log(p);
      this.todos = p;
      //.filter((todo) => todo.id <= 20);
    });
  }

  addTodo(todo: string) {
    // this.todoService
    //   .addTodo(todo)
    //   .then((todo) => (this.todos = [todo, ...this.todos])); // push lo manda alla fine, però evita duplicazione id
    this.todoService.addNewTodo(todo).subscribe((res) => {
      console.log(res);
      this.todos.push(res);
    });
  }

  updateTodo(todo: Todo) {
    todo.completed = !todo.completed;
    //console.log(todo.completed);
    this.todoService.updateTodo(todo).subscribe();
  }
}
