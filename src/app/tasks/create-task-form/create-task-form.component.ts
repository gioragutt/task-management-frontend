import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormComponent } from 'src/app/dialog/configs';
import { CreateTaskDto } from '../tasks.service';

@Component({
  selector: 'app-create-task-form',
  templateUrl: './create-task-form.component.html',
  styleUrls: ['./create-task-form.component.scss'],
})
export class CreateTaskFormComponent implements FormComponent<CreateTaskDto> {
  form = this.fb.group({
    title: [''],
    description: [''],
  });

  constructor(private fb: FormBuilder) { }
}
