import { Component, Inject, inject, Injector, input } from '@angular/core';
import { DatePipe } from '@angular/common';

import { type Task } from './task.model';
import { CardComponent } from '../../shared/card/card.component';
import { TasksService } from '../tasks.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-task',
  standalone: true,
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
  imports: [DatePipe, CardComponent,RouterLink],
})
export class TaskComponent {
  private router = inject(Router);
  private activateRoute = inject(ActivatedRoute);
  task = input.required<Task>();
  private tasksService = inject(TasksService);

  onComplete() {
   this.router.navigate(['./'],{
    relativeTo: this.activateRoute,
    onSameUrlNavigation:'reload',
    queryParamsHandling:'preserve'
   })
    this.tasksService.removeTask(this.task().id);
  }
}
