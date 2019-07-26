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
import { TextFieldModule } from '@angular/cdk/text-field';

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
    TextFieldModule,
  ],
})
export class MaterialModule { }
