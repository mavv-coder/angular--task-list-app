import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from 'src/app/model/task';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  task: Task;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getCurrentTask().subscribe((data) => {
      this.task = data;
    });
  }

  addTask(e: Event): void {
    e.preventDefault();
    this.taskService.addNewTask(this.task.name);
    this.taskService.clearCurrentTask();
  }

  editTask(e: Event): void {
    e.preventDefault();
    this.taskService.editTask({ ...this.task });
  }

  updateTask(value: string): void {
    this.task.name = value;
  }

  clearInput(e: Event): void {
    e.preventDefault();
    this.taskService.clearCurrentTask();
  }
}
