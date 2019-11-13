import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'component-barista-example',
  template: `
    <div dtTheme=":dark" class="dark">
      <dt-radio-group name="group0">
        <dt-radio-button value="aberfeldy">Aberfeldy</dt-radio-button>
        <dt-radio-button value="dalmore">Dalmore</dt-radio-button>
        <dt-radio-button value="jacky" disabled>Jack Daniels</dt-radio-button>
        <dt-radio-button value="glenlivet">Glenlivet</dt-radio-button>
      </dt-radio-group>
    </div>
  `,
  styles: [
    'dt-radio-button { display: block; } dt-radio-button + dt-radio-button { margin-top: 20px; }',
  ],
})
export class RadioDarkExample {}
