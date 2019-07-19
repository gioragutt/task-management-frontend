import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map, catchError, tap, switchMapTo } from 'rxjs/operators';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { throwError } from 'rxjs';

interface Task {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  status: 'OPEN' | 'IN_PROGRESS' | 'DONE';
}

const STATUSES: Task['status'][] = ['OPEN', 'IN_PROGRESS', 'DONE'];

interface GroupedByStatus {
  [status: string]: Task[];
}

const groupByStatus = (tasks: Task[]) => tasks.reduce<GroupedByStatus>((acc, curr) => {
  acc[curr.status].push(curr);
  return acc;
}, STATUSES.reduce((acc, curr) => {
  acc[curr] = [];
  return acc;
}, {}));

@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.scss'],
})
export class TestComponentComponent {
  columnOrder = STATUSES;

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {
  }

  tasks$ = this.http.get<Task[]>('http://localhost:3000/tasks', {
    headers: {
      Authorization: `Bearer ${this.authService.accessToken}`,
    },
  }).pipe(map(groupByStatus), catchError(e => {
    if (e.status !== 401) {
      return;
    }
    return this.authService.signOut().pipe(
      tap(() => this.router.navigateByUrl('/auth/signin')),
      switchMapTo(throwError(e)),
    );
  }));

  dropTask({ container, previousContainer, currentIndex, previousIndex }: CdkDragDrop<Task[]>) {
    if (container === previousContainer) {
      return;
    }
    const { id } = previousContainer.data[previousIndex];
    this.http.patch(`http://localhost:3000/tasks/${id}/status`, { status: container.id }, {
      headers: {
        Authorization: `Bearer ${this.authService.accessToken}`,
      },
    }).subscribe(
      (updatedTask: Task) => {
        previousContainer.data[previousIndex] = updatedTask;
        transferArrayItem(previousContainer.data, container.data, previousIndex, currentIndex);
      },
    );
  }

  logOut(): void {
    this.authService.signOut().subscribe(() => this.router.navigateByUrl('/auth/signin'));
  }
}
