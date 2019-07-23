import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { PromptDialogComponent } from './prompt-dialog/prompt-dialog.component';
import { MatDialogModule } from '@angular/material';
import { DialogContentDirective } from './dialog-content.directive';
import { DialogService } from './dialog.service';

const DIALOG_COMPONENTS = [
  ConfirmDialogComponent,
  PromptDialogComponent,
];

@NgModule({
  declarations: [
    ...DIALOG_COMPONENTS,
    DialogContentDirective,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
  ],
  exports: DIALOG_COMPONENTS,
  entryComponents: DIALOG_COMPONENTS,
})
export class DialogModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DialogModule,
      providers: [DialogService],
    };
  }
}
