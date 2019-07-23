import { Component, OnInit, Type, ComponentRef, ComponentFactoryResolver, ViewContainerRef, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { PromptConfig } from '../configs';

@Component({
  selector: 'app-prompt-dialog',
  templateUrl: './prompt-dialog.component.html',
  styleUrls: ['./prompt-dialog.component.scss'],
})
export class PromptDialogComponent<T> {
  constructor(
    @Inject(MAT_DIALOG_DATA) public dialog: PromptConfig<T>,
    public dialogRef: MatDialogRef<PromptDialogComponent<T>>,
  ) { }
}
