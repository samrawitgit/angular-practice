import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Todo } from '../../Todo';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css'],
})
export class AddTodoComponent implements OnInit {
  @Output() onAddTodo = new EventEmitter();
  title: string;

  constructor() {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (!this.title) {
      alert('Please add a Todo!');
      return;
    }
    // const newTodo = {
    //   id: 52,
    //   title: this.title,
    //   completed: false,
    // };

    this.onAddTodo.emit(this.title);
    //console.log(newTodo);

    this.title = '';
  }
}
