import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';

@Pipe({
  name: 'adharNumberMask',
})
export class AdharNumberMaskPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    const adharNumber = value as number;
    if (adharNumber) {
      const maskedAdhar = adharNumber.toString().replace(/.(?=.{4})/g, '*');
      return maskedAdhar;
    }
    return null;
  }
}
