import { NgModule } from '@angular/core';
import { DialogModule } from '../dialog/dialog.module';
import { SharedModule } from '../shared/shared.module';
import { CreateTaskFormComponent } from './create-task-form/create-task-form.component';
import { TasksPageComponent } from './tasks-page/tasks-page.component';
import { TasksRoutingModule } from './tasks-routing.module';

@NgModule({
  declarations: [
    TasksPageComponent,
    CreateTaskFormComponent,
  ],
  imports: [
    SharedModule,
    TasksRoutingModule,
    DialogModule,
  ],
  entryComponents: [
    CreateTaskFormComponent,
  ],
})
export class TasksModule { }
