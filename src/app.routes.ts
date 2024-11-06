import { CanMatch, CanMatchFn, RedirectCommand, Route, Router } from "@angular/router";
import { NoTaskComponent } from "./app/tasks/no-task/no-task.component";
import { resolveTitle, resolveUserName, UserTasksComponent } from "./app/users/user-tasks/user-tasks.component";
import { resolveUserTasks, TasksComponent } from "./app/tasks/tasks.component";
import { cantleaveEditPage, NewTaskComponent } from "./app/tasks/new-task/new-task.component";
import { NotfoundComponent } from "./app/notfound/notfound.component";
import { inject } from "@angular/core";



const dummyCanMatch:CanMatchFn = (route,segments)=>{
    const router = inject(Router);
    const shouldGetAccess = Math.random();
    if(shouldGetAccess){
        return true;
    }
    return new RedirectCommand(router.parseUrl('/unauthorized'));

};

export const   routes:Route[] =[
    { path:'user/:userId', component : UserTasksComponent ,
         resolve:{
            userName: resolveUserName
         },
        children: [
        {
            path:'tasks',component:TasksComponent,
            runGuardsAndResolvers:'always',
            resolve:{
                userTasks:resolveUserTasks
            },
        },
        {
            path:'tasks/new',
            component:NewTaskComponent,
            canDeactivate:[cantleaveEditPage]
        },
        
    ],
    title:resolveTitle,
    canMatch:[dummyCanMatch]
},
    { path:'', component : NoTaskComponent },
    { path: '**', component : NotfoundComponent}
]