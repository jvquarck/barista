/**
 * @license
 * Copyright 2019 Dynatrace LLC
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// tslint:disable:no-magic-numbers

import { Component } from '@angular/core';

import { DtChartSeries } from '@dynatrace/barista-components/chart';
import { formatCount } from '@dynatrace/barista-components/formatters';

import { generateData } from './data';

@Component({
  selector: 'barista-demo',
  template: `
    <dt-micro-chart [series]="series" [labelFormatter]="_formatterFn">
      <dt-chart-tooltip>
        <ng-template let-tooltip>
          {{ tooltip.y | dtCount }}
        </ng-template>
      </dt-chart-tooltip>
    </dt-micro-chart>
  `,
})
export class MicroChartDefaultExample {
  series: DtChartSeries = {
    name: 'Requests',
    data: generateData(40, 1000, 2000, 1370304000000, 900000),
  };

  _formatterFn = (input: number) => formatCount(input).toString();
}
