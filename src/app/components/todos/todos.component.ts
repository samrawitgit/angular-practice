import { Component, OnInit } from '@angular/core';
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
    this.todoService.getTodos().then((todos) => (this.todos = todos));
    this.todoService.detTodos().then((x) => x.subscribe((p) => console.log(p)));
  }

  addTodo(todo: string) {
    this.todoService.addTask(todo).then((todo) => this.todos.fill(todo, 0, 0));

    //this.todos.push(newTodo);
    //console.log(newTodo);
  }
}
