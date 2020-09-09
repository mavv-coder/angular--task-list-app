import { Injectable } from '@angular/core';
import { getTaskList } from '../../api/mock-data';
import { Observable, BehaviorSubject } from 'rxjs';
import { Task } from '../../model/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  taskList: Task[];
  currentTask: Task;
  taskList$: BehaviorSubject<Task[]>;
  currentTask$: BehaviorSubject<Task>;

  constructor() {
    if (localStorage.getItem('taskList') === null) {
      getTaskList().subscribe((data) => {
        this.taskList = data;
        this.taskList$ = new BehaviorSubject([...this.taskList]);
      });
    } else {
      const TaskListFromLS = JSON.parse(localStorage.getItem('taskList'));
      this.taskList = TaskListFromLS;
      this.taskList$ = new BehaviorSubject([...this.taskList]);
    }
    this.currentTask = { name: '', id: '' };
    this.currentTask$ = new BehaviorSubject(this.currentTask);
  }

  getTaskList(): Observable<Task[]> {
    return this.taskList$.asObservable();
  }

  getCurrentTask(): Observable<Task> {
    return this.currentTask$.asObservable();
  }

  addNewTask(name: string): void {
    const newTask = { id: this.generateId(), name };
    const newTaskList = [...this.taskList, newTask];
    this.taskList = newTaskList;
    this.taskList$.next([...this.taskList]);
    localStorage.setItem('taskList', JSON.stringify([...this.taskList]));
  }

  deleteTask(id: string): void {
    const newTaskList = this.taskList.filter((x) => x.id !== id);
    this.taskList = newTaskList;
    this.taskList$.next([...this.taskList]);
    localStorage.setItem('taskList', JSON.stringify([...this.taskList]));
  }

  clearCurrentTask() {
    this.currentTask = { name: '', id: '' };
    this.currentTask$.next({ ...this.currentTask });
  }

  selectEditTask(task: Task): void {
    this.currentTask = task;
    this.currentTask$.next({ ...this.currentTask });
  }

  editTask(task: Task): void {
    const index = this.taskList.findIndex((x) => x.id === this.currentTask.id);
    const newTaskList = this.taskList;
    newTaskList.splice(index, 1, task);
    this.taskList = newTaskList;
    this.taskList$.next([...this.taskList]);
    localStorage.setItem('taskList', JSON.stringify([...this.taskList]));
    this.clearCurrentTask();
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
