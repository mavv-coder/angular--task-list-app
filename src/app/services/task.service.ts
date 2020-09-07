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
}
