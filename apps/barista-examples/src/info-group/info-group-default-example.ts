import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'component-barista-example',
  template: `
    <dt-info-group>
      <dt-info-group-icon><dt-icon name="agent"></dt-icon></dt-info-group-icon>
      <dt-info-group-title>5 min 30 s</dt-info-group-title>
      Session duration
    </dt-info-group>
  `,
})
export class InfoGroupDefaultExample {}
