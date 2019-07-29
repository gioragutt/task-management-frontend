import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module')
      .then(m => m.AuthModule),
  },
  {
    path: 'tasks',
    loadChildren: () => import('./tasks/tasks.module')
      .then(m => m.TasksModule),
  },
  {
    path: 'editor-testing',
    loadChildren: () => import('./editor-testing/editor-testing.module')
      .then(m => m.EditorTestingModule),
  },
  { path: '**', pathMatch: 'full', redirectTo: '/tasks' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
