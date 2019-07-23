import { FormGroup } from '@angular/forms';
import { Type } from '@angular/core';

export interface ActionButtonData {
  text: string;
  color: 'primary' | 'accent' | 'warn' | '';
}

export type ActionButton = string | ActionButtonData;

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
  formValue: T;
}

export interface PromptConfig<T> extends ConfirmConfig {
  formComponent: Type<FormComponent<T>>;
}

const normalizeActionButton = (actionButton?: ActionButton): ActionButtonData => {
  if (!actionButton) {
    return undefined;
  }
  if (typeof actionButton === 'string') {
    return { text: actionButton, color: 'primary' };
  }
  return actionButton;
};

export function normalizeDialogConfig<T extends ConfirmConfig>({ ok, close, ...rest }: T) {
  return {
    ...rest,
    ok: normalizeActionButton(ok),
    close: normalizeActionButton(close),
  };
}
