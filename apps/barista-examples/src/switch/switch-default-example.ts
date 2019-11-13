import { Component } from '@angular/core';

@Component({
  selector: 'component-barista-example',
  template: `
    <dt-switch>Default</dt-switch>
    <dt-switch checked>Checked</dt-switch>
    <dt-switch disabled>Disabled</dt-switch>
    <dt-switch checked disabled>Checked Disabled</dt-switch>
  `,
  styles: [
    `
      dt-switch {
        display: block;
      }
      dt-switch + dt-switch {
        margin-top: 20px;
      }
    `,
  ],
})
export class SwitchDefaultExample {}
