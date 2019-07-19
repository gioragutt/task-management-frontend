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
  ],
})
export class MaterialModule { }
