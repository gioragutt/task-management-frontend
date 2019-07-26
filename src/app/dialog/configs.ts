import { FormGroup } from '@angular/forms';
import { Type } from '@angular/core';
import { ThemePalette } from '@angular/material';

export interface ActionButton {
  text: string;
  color?: ThemePalette;
}

export interface AlertConfig {
  title?: string;
  content?: string;
  close: ActionButton;
}

export interface ConfirmConfig extends AlertConfig {
  ok?: ActionButton;
}

export interface FormComponent<T> {
  form: FormGroup;
}

export interface PromptConfig<T> extends ConfirmConfig {
  formComponent: Type<FormComponent<T>>;
}
