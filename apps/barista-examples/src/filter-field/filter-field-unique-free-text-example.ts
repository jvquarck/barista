import { Component } from '@angular/core';

import { DtFilterFieldDefaultDataSource } from '@dynatrace/barista-components/filter-field';

@Component({
  moduleId: module.id,
  selector: 'component-barista-example',
  template: `
    <dt-filter-field
      [dataSource]="_dataSource"
      label="Filter by"
      clearAllLabel="Clear all"
    ></dt-filter-field>
  `,
})
export class FilterFieldUniqueFreeTextExample {
  private DATA = {
    autocomplete: [
      {
        name: 'Unique address',
        suggestions: [],
        unique: true,
      },
      {
        name: 'Address',
        suggestions: [],
      },
    ],
  };

  _dataSource = new DtFilterFieldDefaultDataSource(this.DATA);
}
