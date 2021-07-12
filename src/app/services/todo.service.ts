import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Todo } from '../Todo';

const httpHeaders = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  //todos: Todo[] = [];
  url: string = 'https://jsonplaceholder.typicode.com/todos';
  private apiUrl = 'http://localhost:5000/todos';

  constructor(private http: HttpClient) {}

  // async getTodosT(): Promise<Todo[]> {
  //   let response = await fetch(this.url);

  //   if (!response.ok) {
  //     //console.log('response.ok: ' + response.ok);
  //     throw new Error(`HTTP error! Status: ${response.status}`);
  //   }
  //   //console.log('Res: ' + response);
  //   let content: Todo[] = await response.json().then(
  //     (todos) => (this.todos = todos.filter((todo: Todo) => todo.id <= 20))
  //     //(todos) => (this.todos = todos)
  //   );
  //   //console.log(content);
  //   return content;
  // }
  async manageData(method: string) {
    const response = await fetch(this.url, {
      method: method, // *GET, POST, PUT, DELETE, etc.

      headers: {
        'Content-Type': 'application/json',
      },
    });
    let data = await response.json();
    return data;
  }

  getTodos(): Observable<Todo[]> {
    let content = from(this.manageData('GET'));
    //console.log(content);
    return content;
  }

  async addTodo(todo: string) {
    const settings = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: todo,
        completed: false,
      }),
    };
    try {
      const fetchResponse = await fetch(this.url, settings);
      return await fetchResponse.json();
      //console.log(data);
    } catch (e) {
      return e;
    }
  }

  //using HttpClient
  getTodoList(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  addNewTodo(todo: string): Observable<Todo> {
    const body: Todo = {
      title: todo,
      completed: false,
    };
    return this.http.post<Todo>(this.apiUrl, body, httpHeaders);
  }

  updateTodo(todo: Todo): Observable<Todo> {
    const newUrl = this.apiUrl + '/' + todo.id;
    console.log(newUrl);
    return this.http.put<Todo>(newUrl, todo, httpHeaders);
  }
}
