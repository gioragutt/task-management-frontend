import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestComponentComponent } from './test-component/test-component.component';
import { AuthGuard, AuthGuardData } from './auth/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module')
      .then(m => m.AuthModule),
  },
  {
    path: '',
    component: TestComponentComponent,
    canActivate: [AuthGuard],
    data: {
      authGuard: {
        mustBeLogged: 'in',
        routeTo: '/auth/signin',
      } as AuthGuardData,
    },
  },
  {
    path: 'tasks',
    loadChildren: () => import('./tasks/tasks.module')
      .then(m => m.TasksModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
