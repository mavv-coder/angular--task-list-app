import { Task } from '../model/task';
import { Observable, of } from 'rxjs';

const task: Task[] = [
  { id: '499d', name: 'Water the plants' },
  { id: '94545', name: 'Buy some food' },
  { id: 'e399', name: 'Clean the car' },
];

export const getTaskList = (): Observable<Task[]> => of(task);
