import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorTestingRoutingModule } from './editor-testing-routing.module';
import { EditorTestingComponent } from './editor-testing.component';


@NgModule({
  declarations: [EditorTestingComponent],
  imports: [
    CommonModule,
    EditorTestingRoutingModule,
  ],
})
export class EditorTestingModule { }
