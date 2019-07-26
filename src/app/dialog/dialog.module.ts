import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { PromptDialogComponent } from './prompt-dialog/prompt-dialog.component';
import { MatDialogModule, MatButtonModule } from '@angular/material';
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
    MatButtonModule,
  ],
  exports: DIALOG_COMPONENTS,
  entryComponents: DIALOG_COMPONENTS,

  /**
   * The dialog service is provided every time and not injected to root,
   * Due to how entry component work with Lazy Loaded modules.
   *
   * The module needs to be loaded inside every lazy loaded module,
   * Otherwise it will not recognize the `entryComponent` declared inside the
   * Lazy loaded module, and it will not be able to create a `component factory`.
   */
  providers: [DialogService],
})
export class DialogModule {
}
