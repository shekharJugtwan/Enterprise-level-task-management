import { Component, inject,  input } from '@angular/core';
import { UsersService } from '../users.service';
import {  ActivatedRouteSnapshot, ResolveFn, RouterLink, RouterOutlet, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent  {
  userName= input.required<string>();
}

export const resolveUserName:ResolveFn<string> = (activatedRoute:ActivatedRouteSnapshot,routerState:RouterStateSnapshot)=>{

  const usersService = inject(UsersService);
  const userName  = usersService.users.find(u => activatedRoute.paramMap.get('userId') === u.id)?.name || '';
return userName;
}