import { Component } from '@angular/core';
import { OriginalClassName } from '../../../core/decorators';

@Component({
  moduleId: module.id,
  template: `
    <p>Selected Value: <i>{{selectedValue || 'No value selected'}}</i></p>
    <dt-select placeholder="Choose your coffee" [(ngModel)]="selectedValue">
      <dt-option *ngFor="let coffee of coffees" [value]="coffee.value">
        {{coffee.viewValue}}
      </dt-option>
    </dt-select>
  `,
})
@OriginalClassName('FormsSelectExampleComponent')
export class FormsSelectExampleComponent {
  selectedValue: string;
  coffees = [
    { value: 'ThePerfectPour', viewValue: 'ThePerfectPour' },
    { value: 'Affogato', viewValue: 'Affogato' },
    { value: 'Americano', viewValue: 'Americano' },
  ];
}
