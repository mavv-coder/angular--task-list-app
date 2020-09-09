import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task-service/task.service';
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

  selectEditTask(task: Task): void {
    this.taskService.selectEditTask(task);
  }
}
