import { Component } from '@angular/core';

@Component({
  selector: 'component-barista-example',
  template: `
    <section class="dark" dtTheme=":dark">
      <p>
        <input
          type="text"
          dtInput
          #input
          placeholder="Please insert text"
          value="Text"
          aria-label="Please insert text"
        />
        <!-- prettier-ignore -->
        <textarea
          dtInput
          #textarea
          placeholder="Please insert text"
          aria-label="Please insert text"
        >Text</textarea>
      </p>
      <button
        dt-button
        (click)="
          input.disabled = !input.disabled;
          textarea.disabled = !textarea.disabled
        "
      >
        Toggle disabled
      </button>
    </section>
  `,
  styles: ['textarea { margin-top: 8px; }'],
})
export class InputDarkExample {}
