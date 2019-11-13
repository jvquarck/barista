import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DtButtonModule } from '@dynatrace/angular-components/button';
import { DtIconModule } from '@dynatrace/angular-components/icon';
import { DtTableModule } from '@dynatrace/angular-components/table';

import { DtTreeTable } from './tree-table';
import { DtTreeTableHeaderCell } from './tree-table-header-cell';
import { DtTreeTableRow } from './tree-table-row';
import { DtTreeTableToggleCell } from './tree-table-toggle-cell';

@NgModule({
  imports: [
    CdkTableModule,
    CommonModule,
    DtButtonModule,
    DtIconModule,
    DtTableModule,
  ],
  declarations: [
    DtTreeTableRow,
    DtTreeTable,
    DtTreeTableToggleCell,
    DtTreeTableHeaderCell,
  ],
  exports: [
    DtTreeTableRow,
    DtTreeTable,
    DtTreeTableToggleCell,
    DtTreeTableHeaderCell,
    DtButtonModule,
    DtIconModule,
    DtTableModule,
  ],
})
export class DtTreeTableModule {}
