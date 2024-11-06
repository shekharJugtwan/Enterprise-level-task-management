import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TasksService } from '../tasks.service';
import {  CanDeactivateFn, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  private router = inject(Router);

  userId = input.required<string>();
  submitted = false;
  enteredTitle = signal('');
  enteredSummary = signal('');
  enteredDate = signal('');
  private tasksService = inject(TasksService);

  onSubmit() {
    this.submitted=true;
    this.tasksService.addTask(
      {
        title: this.enteredTitle(),
        summary: this.enteredSummary(),
        date: this.enteredDate(),
      },
      this.userId()
    );
    this.router.navigate(['user',this.userId(),'tasks'],{
      replaceUrl:true
    })
  }
}

export const cantleaveEditPage : CanDeactivateFn<NewTaskComponent> = (component) => {
  if(component.submitted)
  {
    return true;
  }
  if(component.enteredTitle() || component.enteredSummary() || component.enteredDate()){
    return window.confirm('all the data will we be erased if you continue to leave')
  }
  return true;
}