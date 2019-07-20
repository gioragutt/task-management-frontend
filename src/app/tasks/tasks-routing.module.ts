import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TasksPageComponent } from './tasks-page/tasks-page.component';
import { AuthGuard, loggedInOrRedirectTo } from '../auth/auth.guard';

const routes: Routes = [{
  path: '',
  component: TasksPageComponent,
  canActivate: [AuthGuard],
  data: {
    authGuard: loggedInOrRedirectTo('/auth/signin'),
  },
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksRoutingModule { }
