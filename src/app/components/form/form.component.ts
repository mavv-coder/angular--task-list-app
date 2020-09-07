import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  taskName: string;

  constructor(private taskService: TaskService) {
    this.taskName = '';
  }

  ngOnInit(): void {}

  addTask(e): void {
    e.preventDefault();
    this.taskService.addNewTask(this.taskName);
    this.taskName = '';
  }

  updateTask(value: string): void {
    this.taskName = value;
  }
}
