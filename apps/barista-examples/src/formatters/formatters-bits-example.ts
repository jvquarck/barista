import { Component } from '@angular/core';

@Component({
  selector: 'component-barista-example',
  template: `
    <dt-form-field>
      <dt-label>Value to be transformed</dt-label>
      <input dtInput [(ngModel)]="exampleValue" />
    </dt-form-field>
    <p>Default: {{ exampleValue | dtBits }}</p>
    <p>Factor 1024: {{ exampleValue | dtBits: 1024 }}</p>
  `,
})
export class FormattersBitsExample {
  exampleValue: string;
}
