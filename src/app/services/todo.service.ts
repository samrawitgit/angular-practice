import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { Todo } from '../Todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos: Todo[] = [];
  url: string = 'https://jsonplaceholder.typicode.com/todos';

  constructor() {}

  async getTodos(): Promise<Todo[]> {
    let response = await fetch(this.url);

    if (!response.ok) {
      //console.log('response.ok: ' + response.ok);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    //console.log('Res: ' + response);
    let content: Todo[] = await response.json().then(
      (todos) => (this.todos = todos.filter((todo: Todo) => todo.id <= 20))
      //(todos) => (this.todos = todos)
    );
    //console.log(content);
    return content;
  }

  async detTodos() {
    let response = await fetch(this.url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    let data: Todo[] = await response.json();
    let content = of(data);
    // console.log(content);
    return content;
  }

  lastID(): number {
    const lastItem = this.todos[this.todos.length - 1];
    return lastItem.id;
  }

  async addTask(todo: string) {
    let newID = this.lastID() + 1;
    const settings = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: 12,
        id: newID,
        title: todo,
        completed: false,
      }),
    };
    try {
      const fetchResponse = await fetch(this.url, settings);
      return await fetchResponse.json;
      //console.log(data);
    } catch (e) {
      return e;
    }
  }
}
