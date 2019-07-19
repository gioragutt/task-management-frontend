import { Pipe, PipeTransform } from '@angular/core';
import { TitleCasePipe } from '@angular/common';

const TITLE_CASE = new TitleCasePipe();

@Pipe({
  name: 'appTitlecase',
  pure: true,
})
export class AppTitlecasePipe implements PipeTransform {

  transform(value: any): any {
    if (typeof value === 'string') {
      return TITLE_CASE.transform(value.split('_').join(' '));
    }
    return TITLE_CASE.transform(value);
  }

}
