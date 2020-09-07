import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../model/task';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  taskList: Task[];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTaskList().subscribe((data) => {
      this.taskList = data;
    });
  }

  deleteTask(id: string): void {
    if (confirm('Are you sure?')) {
      this.taskService.deleteTask(id);
    }
  }

  editTask(task: Task): void {
    this.taskService.editTask(task);
  }
}
