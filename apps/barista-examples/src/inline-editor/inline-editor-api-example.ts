import { Component, ViewChild } from '@angular/core';

import { DtInlineEditor } from '@dynatrace/barista-components/inline-editor';

@Component({
  selector: 'component-barista-example',
  template: `
    <em
      #sampleEditor
      dt-inline-editor
      [(ngModel)]="sampleModel"
      aria-label-save="Save text"
      aria-label-cancel="Cancel and discard changes"
    ></em>

    <button (click)="sampleEditor.enterEditing()">open editor</button>
    <button (click)="sampleEditor.saveAndQuitEditing()">save changes</button>
    <button (click)="sampleEditor.cancelAndQuitEditing()">
      cancel changes
    </button>
  `,
})
export class InlineEditorApiExample {
  @ViewChild('sampleEditor', { static: true }) sampleEditor: DtInlineEditor;
  sampleModel = 'text content';
}
