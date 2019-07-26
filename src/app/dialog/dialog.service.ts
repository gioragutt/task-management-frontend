import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertConfig, PromptConfig, ConfirmConfig } from './configs';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { PromptDialogComponent } from './prompt-dialog/prompt-dialog.component';
import { map, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

export type DialogConfig = Partial<MatDialogConfig<any>>;

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) { }

  alert(alert: AlertConfig, config?: DialogConfig): Observable<void> {
    config = config || {};
    const dialogRef = this.dialog.open(ConfirmDialogComponent,
      { width: '350px', ...config, data: alert },
    );
    return dialogRef.afterClosed();
  }

  confirm(confirm: ConfirmConfig, config?: DialogConfig): Observable<boolean> {
    config = config || {};
    const dialogRef = this.dialog.open(ConfirmDialogComponent,
      { width: '350px', ...config, data: confirm },
    );
    return dialogRef.afterClosed().pipe(map(r => !!r));
  }

  prompt<T>(prompt: PromptConfig<T>, config?: DialogConfig): Observable<T> {
    config = config || {};
    const dialogRef = this.dialog.open(PromptDialogComponent,
      { width: '350px', ...config, data: prompt },
    );
    return dialogRef.afterClosed().pipe(filter(t => !!t));
  }
}
