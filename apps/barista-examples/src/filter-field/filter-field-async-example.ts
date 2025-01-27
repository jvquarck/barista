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

import { Component } from '@angular/core';

import {
  DtFilterFieldCurrentFilterChangeEvent,
  DtFilterFieldDefaultDataSource,
} from '@dynatrace/barista-components/filter-field';

// tslint:disable: no-any

@Component({
  selector: 'component-barista-example',
  template: `
    <dt-filter-field
      [dataSource]="_dataSource"
      (currentFilterChanges)="currentFilterChanged($event)"
      label="Filter by"
      clearAllLabel="Clear all"
    ></dt-filter-field>
  `,
})
export class FilterFieldAsyncExample {
  private DATA = {
    autocomplete: [
      {
        name: 'AUT (async)',
        async: true,
        autocomplete: [],
      },
      {
        name: 'USA',
        autocomplete: ['San Francisco', 'Los Angeles', 'New York'],
      },
    ],
  };

  private ASYNC_DATA = {
    name: 'AUT (async)',
    autocomplete: ['Linz', 'Vienna', 'Graz'],
  };

  _dataSource = new DtFilterFieldDefaultDataSource<any>(this.DATA);

  currentFilterChanged(
    event: DtFilterFieldCurrentFilterChangeEvent<any>,
  ): void {
    if (event.added[0] === this.DATA.autocomplete[0]) {
      // Emulate a http request
      setTimeout(() => {
        this._dataSource.data = this.ASYNC_DATA;
      }, 1000);
    }
  }
}
