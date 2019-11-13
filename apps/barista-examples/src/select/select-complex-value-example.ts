import { Component } from '@angular/core';

@Component({
  selector: 'component-barista-example',
  template: `
    <p>
      Selected Value label:
      <i>{{ selectedValue?.viewValue || 'No value selected' }}</i>
    </p>
    <dt-select
      placeholder="Choose your coffee"
      [(ngModel)]="selectedValue"
      aria-label="Choose your coffee"
    >
      <dt-option *ngFor="let coffee of coffees" [value]="coffee">
        {{ coffee.viewValue }}
      </dt-option>
    </dt-select>
  `,
})
export class SelectComplexValueExample {
  selectedValue: { value: string; viewValue: string };
  coffees = [
    { value: 'ThePerfectPour', viewValue: 'ThePerfectPour' },
    { value: 'Affogato', viewValue: 'Affogato' },
    { value: 'Americano', viewValue: 'Americano' },
  ];
}
