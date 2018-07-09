import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'todays'
})
export class TodaysPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let dd = Math.floor(value/24);
    let hh = value-(dd*24);
    return dd+" days left and "+hh;
  }

}
