import { Component } from '@angular/core';
import { FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Subject, timer, of, Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

const id = () => Math.floor(Math.random() * 999999);

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
  }).pipe(map(groupByStatus));

  data: { status: string, tasks: number[] }[] = [
    { status: 'Open', tasks: [id(), id(), id()] },
    { status: 'In Progress', tasks: [id(), id()] },
    { status: 'Done', tasks: [id(), id()] },
  ];

  logOut(): void {
    this.authService.signOut().subscribe(() => this.router.navigateByUrl('/auth/signin'));
  }
}
