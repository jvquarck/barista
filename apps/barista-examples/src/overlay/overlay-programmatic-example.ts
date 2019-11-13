import { Component, ElementRef, ViewChild } from '@angular/core';

import { DtOverlay } from '@dynatrace/barista-components/overlay';

@Component({
  moduleId: module.id,
  selector: 'component-barista-example',
  template: 'overlay',
})
export class DummyOverlay {}

@Component({
  moduleId: module.id,
  selector: 'component-barista-example',
  template: `
    <button dt-button (click)="createOverlay()">Create overlay</button>
    <button dt-button (click)="dismiss()">Dismiss</button>
    <p><span #origin>An overlay will be created here</span></p>
  `,
})
export class OverlayProgrammaticExample {
  @ViewChild('origin', { static: true }) origin: ElementRef;

  constructor(private _dtOverlay: DtOverlay) {}

  createOverlay(): void {
    this._dtOverlay.create(this.origin, DummyOverlay);
  }

  dismiss(): void {
    this._dtOverlay.dismiss();
  }
}
