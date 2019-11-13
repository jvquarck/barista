import { Component } from '@angular/core';

@Component({
  selector: 'component-barista-example',
  template: `
    <dt-form-field>
      <input
        type="text"
        dtInput
        placeholder="Please insert text"
        aria-label="Please insert text"
      />
      <dt-hint>Left hint</dt-hint>
      <dt-hint align="end">Right hint</dt-hint>
    </dt-form-field>
  `,
})
export class FormFieldHintExample {}
