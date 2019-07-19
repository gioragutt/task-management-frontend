import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatRadioModule,
  MatSelectModule,
  MatDividerModule,
  MatToolbarModule,
  MatIconModule,
  MatBadgeModule,
} from '@angular/material';

import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  exports: [
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatBadgeModule,
    DragDropModule,
  ],
})
export class MaterialModule { }
