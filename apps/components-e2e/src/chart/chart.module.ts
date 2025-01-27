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

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { DtChartModule } from '../../lib';
import { ChartUI } from './chart-ui';
import { ChartHighchartsUI } from './highcharts/chart-highcharts-ui';

const routes: Route[] = [
  { path: '', component: ChartUI },
  {
    path: 'selection-area',
    loadChildren: () =>
      import('./selection-area/selection-area.module').then(
        m => m.SelectionAreaModule,
      ),
  },
  { path: 'highcharts', component: ChartHighchartsUI },
];

@NgModule({
  declarations: [ChartUI, ChartHighchartsUI],
  imports: [CommonModule, RouterModule.forChild(routes), DtChartModule],
  exports: [],
  providers: [],
})
export class ChartModule {}
