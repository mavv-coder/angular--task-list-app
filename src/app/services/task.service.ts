import { Injectable } from '@angular/core';
import { getTaskList } from '../api/mock-data';
import { of, Observable } from 'rxjs';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  taskList: Task[];

  constructor() {
    getTaskList().subscribe((data) => {
      this.taskList = data;
    });
  }

  getTaskList(): Observable<Task[]> {
    return of(this.taskList);
  }

  addNewTask(name: string): void {
    const newTask = { name, id: this.generateId() };
    this.taskList.push(newTask);
  }

  generateId(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (
      c
    ) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
