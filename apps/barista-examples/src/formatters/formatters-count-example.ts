import { Component } from '@angular/core';

@Component({
  selector: 'component-barista-example',
  template: `
    <dt-form-field>
      <dt-label>Value to be transformed</dt-label>
      <input dtInput [(ngModel)]="exampleValue" />
    </dt-form-field>
    <p>Default: {{ exampleValue | dtCount }}</p>
    <p>With unit: {{ exampleValue | dtCount: 'req.' }}</p>
  `,
})
export class FormattersCountExample {
  exampleValue: number;
}
