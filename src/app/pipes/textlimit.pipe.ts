import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textlimit'
})
export class TextlimitPipe implements PipeTransform {

  transform(value: any, limit?: any): any {
    let actualLimit = (limit)? limit : 10;
    if (value.length >= actualLimit)
      return value.substr(0, actualLimit) + '...';
    return value;
  }

}
