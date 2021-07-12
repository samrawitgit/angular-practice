import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../../Todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo!: Todo; //I know it's not empty
  @Output() onUpdate = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onClick(todo: Todo): void {
    this.onUpdate.emit(todo);
  }
}
