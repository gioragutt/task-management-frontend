import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { map, filter, switchMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { Task, TaskStatus } from '../task.model';
import { TasksService } from '../tasks.service';
import { wrapDropEvent } from 'src/app/drag-drog-utils';

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

  constructor(private tasksService: TasksService, private authService: AuthService, private router: Router) {
  }

  tasks$ = this.tasksService.getTasks().pipe(map(groupByStatus));

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
