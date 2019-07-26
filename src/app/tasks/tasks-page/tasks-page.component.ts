import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { PromptConfig } from 'src/app/dialog/configs';
import { DialogService } from 'src/app/dialog/dialog.service';
import { wrapDropEvent } from 'src/app/drag-drog-utils';
import { CreateTaskFormComponent } from '../create-task-form/create-task-form.component';
import { Task, TaskStatus } from '../task.model';
import { CreateTaskDto, TasksService } from '../tasks.service';

interface GroupedByStatus {
  [status: string]: Task[];
}

const STATUSES = Object.keys(TaskStatus);

const groupByStatus = (tasks: Task[]) => tasks.reduce<GroupedByStatus>((acc, curr) => {
  acc[curr.status].push(curr);
  return acc;
}, STATUSES.reduce((acc, curr) => {
  acc[curr] = [];
  return acc;
}, {}));

const confirm = (message: string) => new Observable((observer: Subscriber<boolean>) => {
  const result = window.confirm(message);
  observer.next(result);
  observer.complete();
});

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.scss'],
})
export class TasksPageComponent {
  columnOrder = STATUSES;

  constructor(
    private tasksService: TasksService,
    private authService: AuthService,
    private router: Router,
    private dialogService: DialogService,
  ) { }

  tasks$ = this.tasksService.getTasks().pipe(map(groupByStatus));

  openCreateDialog(tasks: Task[]) {
    const promptConfig: PromptConfig<CreateTaskDto> = {
      formComponent: CreateTaskFormComponent,
      ok: { color: 'primary', text: 'Create' },
      close: { text: 'Cancel' },
      title: 'Create New Task',
    };
    this.dialogService.prompt(promptConfig, { width: '600px' }).pipe(
      switchMap(createTaskDto => this.tasksService.createTask(createTaskDto)),
    ).subscribe(task => tasks.push(task));
  }

  deleteTask(tasks: Task[], task: Task) {
    const { id, title } = task;
    confirm(`Are you sure you want to delete task #${id}:${'\n\n'}${title}?`).pipe(
      filter(shouldDelete => shouldDelete),
      switchMap(() => this.tasksService.deleteTask(id)),
      tap(() => tasks.splice(tasks.indexOf(task))),
    ).subscribe();
  }

  dropTask(dragDrop: CdkDragDrop<Task[]>) {
    const dropEvent = wrapDropEvent(dragDrop);

    if (dropEvent.isSameContainer) {
      return;
    }

    const { id } = dropEvent.droppedItem;
    dropEvent.transfer();

    this.tasksService.updateTaskStatus(id, dragDrop.container.id as TaskStatus).subscribe(
      (updatedTask: Task) => dropEvent.updateTransferedItemTo(updatedTask),
      dropEvent.transferBack,
    );
  }

  logOut(): void {
    this.authService.signOut().subscribe(() => this.router.navigateByUrl('/auth/signin'));
  }
}
