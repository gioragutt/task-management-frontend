import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TasksPageComponent } from './tasks-page/tasks-page.component';
import { TasksRoutingModule } from './tasks-routing.module';

@NgModule({
  declarations: [TasksPageComponent],
  imports: [
    SharedModule,
    TasksRoutingModule,
  ],
})
export class TasksModule { }
