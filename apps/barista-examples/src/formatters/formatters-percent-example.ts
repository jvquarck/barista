import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'component-barista-example',
  template: `
    <dt-form-field>
      <dt-label>Value to be transformed</dt-label>
      <input dtInput [(ngModel)]="exampleValue" />
    </dt-form-field>
    <p>Default: {{ exampleValue | dtPercent }}</p>
  `,
})
export class FormattersPercentExample {
  exampleValue: number;
}
