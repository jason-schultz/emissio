import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emissionUnit'
})
export class EmissionUnitPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
