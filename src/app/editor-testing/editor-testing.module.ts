import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MonacoEditorModule } from '@materia-ui/ngx-monaco-editor';
import { EditorTestingRoutingModule } from './editor-testing-routing.module';
import { EditorTestingComponent } from './editor-testing.component';

@NgModule({
  declarations: [EditorTestingComponent],
  imports: [
    CommonModule,
    EditorTestingRoutingModule,
    MonacoEditorModule,
    FormsModule,
  ],
})
export class EditorTestingModule { }
