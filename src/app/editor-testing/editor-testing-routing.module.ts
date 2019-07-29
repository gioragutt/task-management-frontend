import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditorTestingComponent } from './editor-testing.component';

const routes: Routes = [{ path: '', component: EditorTestingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditorTestingRoutingModule { }
