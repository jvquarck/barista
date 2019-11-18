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

import { Component, OnInit, ViewChild } from '@angular/core';

import {
  formatBytes,
  formatPercent,
  formatRate,
} from '@dynatrace/barista-components/formatters';
import { DtPagination } from '@dynatrace/barista-components/pagination';
import { DtSort, DtTableDataSource } from '@dynatrace/barista-components/table';

@Component({
  selector: 'component-barista-example',
  // tslint:disable
  template: `
    <dt-table [dataSource]="dataSource" dtSort #sortable>
      <dt-simple-text-column name="host" label="Host"></dt-simple-text-column>
      <dt-simple-number-column name="cpu" label="CPU"></dt-simple-number-column>
      <dt-simple-number-column
        name="memoryPerc"
        label="Memory"
        [formatter]="percentageFormatter"
        dtColumnProportion="3"
      ></dt-simple-number-column>
      <dt-simple-number-column
        name="memoryConsumption"
        label="Memory combined"
        [displayAccessor]="combineMemory"
        [sortAccessor]="memorySortAccessor"
      ></dt-simple-number-column>
      <dt-simple-number-column
        name="traffic"
        label="Traffic"
        sortable="false"
        [formatter]="trafficFormatter"
      ></dt-simple-number-column>

      <dt-header-row
        *dtHeaderRowDef="[
          'host',
          'cpu',
          'memoryPerc',
          'memoryConsumption',
          'traffic'
        ]"
      ></dt-header-row>
      <dt-row
        *dtRowDef="
          let row;
          columns: ['host', 'cpu', 'memoryPerc', 'memoryConsumption', 'traffic']
        "
      ></dt-row>
    </dt-table>

    <dt-pagination></dt-pagination>
  `,
  // tslint:enable
  styles: [
    `
      :host {
        display: flex;
        align-items: flex-start;
        flex-direction: column;
      }

      dt-pagination {
        align-self: center;
        margin: 1em 0;
      }
    `,
  ],
})
export class TablePaginationExample implements OnInit {
  private data: object[] = [
    {
      host: 'et-demo-2-win4',
      cpu: 30,
      memoryPerc: 38,
      memoryTotal: 5830000000,
      traffic: 98700000,
    },
    {
      host: 'et-demo-2-win3',
      cpu: 26,
      memoryPerc: 46,
      memoryTotal: 6000000000,
      traffic: 62500000,
    },
    {
      host: 'docker-host2',
      cpu: 25.4,
      memoryPerc: 35,
      memoryTotal: 5810000000,
      traffic: 41900000,
    },
    {
      host: 'et-demo-2-win1',
      cpu: 23,
      memoryPerc: 7.86,
      memoryTotal: 5820000000,
      traffic: 98700000,
    },
    {
      host: 'et-demo-2-win8',
      cpu: 78,
      memoryPerc: 21,
      memoryTotal: 3520000000,
      traffic: 91870000,
    },
    {
      host: 'et-demo-2-macOS',
      cpu: 21,
      memoryPerc: 34,
      memoryTotal: 3200000000,
      traffic: 1200000,
    },
    {
      host: 'kyber-host6',
      cpu: 12.3,
      memoryPerc: 12,
      memoryTotal: 2120000000,
      traffic: 4500000,
    },
    {
      host: 'dev-demo-5-macOS',
      cpu: 24,
      memoryPerc: 8.6,
      memoryTotal: 4670000000,
      traffic: 3270000,
    },
  ];

  // Get the viewChild to pass the sorter reference to the data-source.
  @ViewChild('sortable', { read: DtSort, static: true }) sortable: DtSort;
  @ViewChild(DtPagination, { static: true }) pagination: DtPagination;

  dataSource: DtTableDataSource<object>;

  constructor() {
    this.dataSource = new DtTableDataSource(this.data);
  }

  ngOnInit(): void {
    // Set the dtSort reference on the dataSource, so it can react to sorting.
    this.dataSource.sort = this.sortable;
    // Set the dtPagination reference on the dataSource, so it can page the data.
    this.dataSource.pagination = this.pagination;
    // Set the pageSize to override the default page size.
    this.dataSource.pageSize = 2;
  }

  percentageFormatter = formatPercent;

  trafficFormatter = (value: number) =>
    formatBytes(formatRate(value, 's'), {
      inputUnit: 'byte',
      outputUnit: 'MB',
      factor: 1024,
    });

  // tslint:disable-next-line: no-any
  combineMemory(row: any): string {
    const memoryPercentage = formatPercent(row.memoryPerc);
    const memoryTotal = formatBytes(row.memoryTotal, {
      inputUnit: 'byte',
      outputUnit: 'GB',
      factor: 1024,
    });
    return `${memoryPercentage} of ${memoryTotal}`;
  }

  // tslint:disable-next-line: no-any
  memorySortAccessor(row: any): number {
    return row.memoryPerc;
  }
}
