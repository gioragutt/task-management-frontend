import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppTitlecasePipe } from './app-titlecase.pipe';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    AppTitlecasePipe,
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    AppTitlecasePipe,
  ],
})
export class SharedModule { }
