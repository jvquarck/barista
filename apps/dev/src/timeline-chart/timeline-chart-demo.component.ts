import { Component } from '@angular/core';

@Component({
  selector: 'timeline-chart-dev-app-demo',
  templateUrl: './timeline-chart-demo-component.html',
  styles: [
    `
      .timeline-chart-demo-controls {
        margin-top: 20px;
        padding-top: 20px;
        border-top: 1px solid #ccc;
      }
    `,
  ],
})
export class TimelineChartDemo {
  showDomInteractive = true;
}
