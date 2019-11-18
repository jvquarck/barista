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

import { Component, ViewChild } from '@angular/core';

import { DtChart } from '@dynatrace/barista-components/chart';
import {
  DtSelectionArea,
  DtSelectionAreaChange,
} from '@dynatrace/barista-components/selection-area';

@Component({
  selector: 'barista-demo',
  template: `
    <dt-chart
      [options]="options"
      [series]="series"
      [dtChartSelectionArea]="area"
    ></dt-chart>
    <dt-selection-area
      #area="dtSelectionArea"
      (changed)="handleChange($event)"
      aria-label-selected-area="Text that describes the content of the selection area."
      aria-label-left-handle="Resize selection area to the left."
      aria-label-right-handle="Resize selection area to the right."
      aria-label-close-button="Close the selection area."
    >
      {{ left | date: 'MMM d, y - HH:mm':'GMT' }} -
      {{ right | date: 'MMM d, y - HH:mm':'GMT' }}
      <dt-selection-area-actions>
        <button dt-button>Zoom in</button>
      </dt-selection-area-actions>
    </dt-selection-area>
  `,
})
export class SelectionAreaChartExample {
  @ViewChild(DtChart, { static: true }) chart: DtChart;
  // tslint:disable-next-line: deprecation
  @ViewChild(DtSelectionArea, { static: true }) selectionArea: DtSelectionArea;

  left: number;
  right: number;

  options: Highcharts.Options = {
    xAxis: {
      type: 'datetime',
      min: 1370302200000,
      startOnTick: true,
    },
    yAxis: [
      {
        title: null,
        labels: {
          format: '{value}',
        },
        tickInterval: 10,
      },
      {
        title: null,
        labels: {
          format: '{value}/min',
        },
        opposite: true,
        tickInterval: 50,
      },
    ],
    plotOptions: {
      column: {
        stacking: 'normal',
      },
      series: {
        marker: {
          enabled: false,
        },
      },
    },
    tooltip: {
      formatter(): string | boolean {
        return `${this.series.name}&nbsp${this.y}`;
      },
    },
  };

  series: Highcharts.IndividualSeriesOptions[] = [
    {
      name: 'Failure rate',
      type: 'line',
      data: generateData(40, 0, 20, 1370304000000, 900000),
    },
    {
      name: 'Requests',
      type: 'column',
      yAxis: 1,
      data: generateData(40, 0, 200, 1370304000000, 900000),
    },
    {
      name: 'Failed requests',
      type: 'column',
      yAxis: 1,
      data: generateData(40, 0, 15, 1370304000000, 900000),
    },
  ];

  // tslint:disable-next-line: deprecation
  handleChange(ev: DtSelectionAreaChange): void {
    this.left = ev.left;
    this.right = ev.right;
  }
}

export function randomize(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}

export function generateData(
  amount: number,
  min: number,
  max: number,
  timestampStart: number,
  timestampTick: number,
): Array<[number, number]> {
  return Array.from(Array(amount).keys()).map(
    v =>
      [timestampStart + timestampTick * v, randomize(min, max)] as [
        number,
        number,
      ],
  );
}
