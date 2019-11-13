// tslint:disable:no-magic-numbers

import { Component } from '@angular/core';

import {
  DtChartOptions,
  DtChartSeries,
} from '@dynatrace/angular-components/chart';

import { generateData } from './data';

@Component({
  selector: 'barista-demo',
  template: `
    <dt-micro-chart [options]="options" [series]="series">
      <dt-chart-tooltip>
        <ng-template let-tooltip>
          {{ tooltip.y | dtCount }}
        </ng-template>
      </dt-chart-tooltip>
    </dt-micro-chart>
  `,
})
export class MicroChartInterpolatedExample {
  options: DtChartOptions = {
    interpolateGaps: true,
  };
  series: DtChartSeries = {
    name: 'Requests',
    data: generateData(40, 0, 200, 1370304000000, 900000).map(
      ([x, y]: [number, number]) => ({
        x,
        y: Math.random() > 0.3 ? y : undefined,
      }),
    ),
  };
}
