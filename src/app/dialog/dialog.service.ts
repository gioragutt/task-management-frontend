import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AlertConfig, PromptConfig, ConfirmConfig } from './configs';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { PromptDialogComponent } from './prompt-dialog/prompt-dialog.component';
import { map, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) { }

  alert(alert: AlertConfig): Observable<void> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent,
      { width: '287px', data: alert },
    );
    return dialogRef.afterClosed();
  }

  confirm(confirm: ConfirmConfig): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent,
      { width: '287px', data: confirm },
    );
    return dialogRef.afterClosed().pipe(map(r => !!r));
  }

  prompt<T>(prompt: PromptConfig<T>): Observable<T> {
    const dialogRef = this.dialog.open(PromptDialogComponent,
      { width: '287px', data: prompt },
    );
    return dialogRef.afterClosed().pipe(filter(t => !!t));
  }
}
