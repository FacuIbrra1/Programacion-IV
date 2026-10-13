import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'regitrado',
})
export class RegitradoPipe implements PipeTransform {
  transform(value: string): string {
    return `${value} ®`
  }
}
