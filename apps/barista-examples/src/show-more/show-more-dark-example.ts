import { Component } from '@angular/core';

@Component({
  selector: 'component-barista-example',
  template: `
    <section class="dark" dtTheme=":dark">
      <dt-show-more [showLess]="showLess" (changed)="showLess = !showLess">
        Toggle more/less
      </dt-show-more>
    </section>
  `,
})
export class ShowMoreDarkExample {
  showLess = false;
}
