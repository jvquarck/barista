import { Component } from '@angular/core';

import { DtFilterFieldDefaultDataSource } from '@dynatrace/angular-components/filter-field';

@Component({
  moduleId: module.id,
  selector: 'component-barista-example',
  template: `
    <dt-filter-field
      [dataSource]="_dataSource"
      label="Filter by"
      aria-label="Filter By Inputvalue"
      clearAllLabel="Clear all"
    ></dt-filter-field>
  `,
})
export class FilterFieldDefaultExample {
  private DATA = {
    autocomplete: [
      {
        name: 'AUT',
        autocomplete: ['Linz', 'Vienna', 'Graz'],
      },
      {
        name: 'USA',
        autocomplete: [
          'San Francisco',
          'Los Angeles',
          'New York',
          { name: 'Custom', suggestions: [], validators: [] },
        ],
      },
      {
        name: 'Requests per minute',
        range: {
          operators: {
            range: true,
            equal: true,
            greaterThanEqual: true,
            lessThanEqual: true,
          },
          unit: 's',
        },
      },
    ],
  };

  _dataSource = new DtFilterFieldDefaultDataSource(this.DATA);
}
