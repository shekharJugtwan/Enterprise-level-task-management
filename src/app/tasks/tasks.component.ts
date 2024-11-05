import { Component, computed, inject, input, OnInit } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { TasksService } from './tasks.service';
import { ResolveFn, RouterLink } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent,RouterLink],
})
export class TasksComponent {

  userId = input.required<string>();
  userTasks = input.required<Task[]>();
  order = input<'asc' | 'desc'>('asc');
}

export const resolveUserTasks:ResolveFn<Task[]> = (activatedRouteSnapshot,RouterState)=>{
  const order =activatedRouteSnapshot.queryParams['order'];
  const taskServie = inject(TasksService)

  const tasks =taskServie.allTasks().filter((task) => task.userId === activatedRouteSnapshot.paramMap.get('userId'));

  if(order && order === 'asc'){
    tasks.sort((a,b) => (a.id>b.id ? 1 : -1));
  }else{
    tasks.sort((a,b) => (a.id>b.id ? -1 : 1));
  }
  return tasks.length?tasks:[];
}
  