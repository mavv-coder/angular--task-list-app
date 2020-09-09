import { Injectable } from '@angular/core';
import { getTaskList } from '../api/mock-data';
import { of, Observable } from 'rxjs';
import { Task } from '../model/task';
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  taskList: Task[];
  currentTask: Task;

  constructor() {
    getTaskList().subscribe((data) => {
      this.taskList = data;
    });
    this.currentTask = { name: '', id: '' };
  }

  getTaskList(): Observable<Task[]> {
    return of(this.taskList);
  }

  getCurrentTask(): Observable<Task> {
    return of(this.currentTask);
  }

  // Mira aquí, Carlos !!!
  addNewTask(name: string): void {
    // const newTask = {  id: this.generateId(), name };
    // this.taskList.push(newTask);
    const newTask = { id: this.generateId(), name };
    const newTaskList = [...this.taskList, newTask];
    this.taskList = newTaskList;
    console.log(this.taskList);
  }

  // Mira aquí, Carlos !!!
  deleteTask(id: string): void {
    // const index = this.taskList.findIndex((x) => x.id === id);
    // this.taskList.splice(index, 1);
    const newTaskList = this.taskList.filter((x) => x.id !== id);
    this.taskList = newTaskList;
    console.log(this.taskList);
  }

  // Mira aquí, Carlos !!!
  clearCurrentTask() {
    // this.currentTask.name = '';
    // this.currentTask.id = '';
    this.currentTask = { name: '', id: '' };
    console.log(this.currentTask);
  }

  // Mira aquí, Carlos !!!
  selectEditTask(task: Task): void {
    // this.currentTask.name = task.name;
    // this.currentTask.id = task.id;
    this.currentTask = task;
    console.log(this.currentTask);
  }

  editTask(task: Task): void {
    const index = this.taskList.findIndex((x) => x.id === this.currentTask.id);
    this.taskList.splice(index, 1, task);
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
