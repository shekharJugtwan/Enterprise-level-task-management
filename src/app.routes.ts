import { Route } from "@angular/router";
import { NoTaskComponent } from "./app/tasks/no-task/no-task.component";
import { resolveUserName, UserTasksComponent } from "./app/users/user-tasks/user-tasks.component";
import { resolveUserTasks, TasksComponent } from "./app/tasks/tasks.component";
import { NewTaskComponent } from "./app/tasks/new-task/new-task.component";
import { NotfoundComponent } from "./app/notfound/notfound.component";


export const   routes =[
    { path:'user/:userId', component : UserTasksComponent ,
         resolve:{
            userName: resolveUserName
         },
        children: [
        {
            path:'tasks',component:TasksComponent,
            runGuardsAndResolvers: 'always',
            resolve:{
                userTasks:resolveUserTasks
            }

        },
        {
            path:'tasks/new',
            component:NewTaskComponent
        },

    ]},
    { path:'', component : NoTaskComponent },
    { path: '**', component : NotfoundComponent}
]