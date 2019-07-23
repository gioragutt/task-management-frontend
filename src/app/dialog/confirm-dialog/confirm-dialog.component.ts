import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

export interface ActionButtonData {
  text: string;
  color: 'primary' | 'accent' | 'warn' | '';
}

export type ActionButton = string | ActionButtonData;

export interface DialogConfig {
  title?: string;
  content?: string;
  ok?: ActionButton;
  close: ActionButton;
}

const normalizeActionButton = (actionButton?: ActionButton): ActionButtonData => {
  if (!actionButton) {
    return undefined;
  }
  if (typeof actionButton === 'string') {
    return { text: actionButton, color: 'primary' };
  }
  return actionButton;
};

const normalizeDialogConfig = ({ ok, close, ...rest }: DialogConfig) => {
  return {
    ...rest,
    ok: normalizeActionButton(ok),
    close: normalizeActionButton(close),
  };
};

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent {
  dialog: DialogConfig;

  constructor(
    @Inject(MAT_DIALOG_DATA) dialogConfig: DialogConfig,
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
  ) {
    this.dialog = normalizeDialogConfig(dialogConfig);
  }
}
