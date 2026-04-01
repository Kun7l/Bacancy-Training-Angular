import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'address',
})
export class AddressPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    const address = value as { street: string; city: string; country: string };
    if (address) {
      return `${address.street}, ${address.city}, ${address.country}`;
    }
    return null;
  }
}
