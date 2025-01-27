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

import { DtSort, DtTableDataSource } from '@dynatrace/barista-components/table';

@Component({
  selector: 'component-barista-example',
  // tslint:disable
  template: `
    <dt-table [dataSource]="dataSource" dtSort #sortable>
      <dt-simple-text-column name="host" label="Host"></dt-simple-text-column>

      <ng-container dtColumnDef="memory" dtColumnAlign="number">
        <dt-header-cell *dtHeaderCellDef dt-sort-header>Memory</dt-header-cell>
        <dt-cell *dtCellDef="let row">
          {{ row.memoryPerc }} / {{ row.memoryTotal }}
        </dt-cell>
      </ng-container>

      <dt-header-row *dtHeaderRowDef="['host', 'memory']"></dt-header-row>
      <dt-row *dtRowDef="let row; columns: ['host', 'memory']"></dt-row>
    </dt-table>
  `,
  // tslint:enable
})
export class TableSortingMixedColumnsExample implements OnInit {
  data: Array<{ host: string; memoryPerc: number; memoryTotal: number }> = [
    {
      host: 'et-demo-2-win4',
      memoryPerc: 38,
      memoryTotal: 5830000000,
    },
    {
      host: 'et-demo-2-win3',
      memoryPerc: 46,
      memoryTotal: 6000000000,
    },
    {
      host: 'docker-host2',
      memoryPerc: 35,
      memoryTotal: 5810000000,
    },
    {
      host: 'et-demo-2-win1',
      memoryPerc: 7.86,
      memoryTotal: 5820000000,
    },
  ];

  // Get the viewChild to pass the sorter reference to the datasource.
  @ViewChild('sortable', { read: DtSort, static: true }) sortable: DtSort;

  // Initialize the table's data source
  dataSource: DtTableDataSource<{
    host: string;
    memoryPerc: number;
    memoryTotal: number;
  }>;

  constructor() {
    this.dataSource = new DtTableDataSource(this.data);
    this.dataSource.addSortAccessorFunction(
      'memory',
      row =>
        // Any accessor computation that returns a comparable value.
        (row.memoryPerc / 100) * row.memoryTotal,
    );
  }

  ngOnInit(): void {
    // Set the dtSort reference on the dataSource, so it can react to sorting.
    this.dataSource.sort = this.sortable;
  }
}
