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

@Component({
  selector: 'component-barista-example',
  // tslint:disable
  template: `
    <dt-table [dataSource]="dataSource">
      <ng-container dtColumnDef="service">
        <dt-header-cell *dtHeaderCellDef>Service</dt-header-cell>
        <dt-cell *dtCellDef="let row">
          <dt-info-group>
            <dt-info-group-icon>
              <dt-icon name="services"></dt-icon>
            </dt-info-group-icon>
            <dt-info-group-title>{{ row.service }}</dt-info-group-title>
            {{ row.location }}
          </dt-info-group>
        </dt-cell>
      </ng-container>

      <ng-container dtColumnDef="responseTime" dtColumnAlign="right">
        <dt-header-cell *dtHeaderCellDef>Response time</dt-header-cell>
        <dt-cell *dtCellDef="let row">
          {{ row.responseTime | dtCount }} ms
        </dt-cell>
      </ng-container>

      <ng-container dtColumnDef="failureRate" dtColumnAlign="right">
        <dt-header-cell *dtHeaderCellDef>Failure rate</dt-header-cell>
        <dt-cell *dtCellDef="let row">
          {{ row.failureRate | dtPercent }}
        </dt-cell>
      </ng-container>

      <dt-header-row
        *dtHeaderRowDef="['service', 'responseTime', 'failureRate']"
      ></dt-header-row>
      <dt-row
        *dtRowDef="let row; columns: ['service', 'responseTime', 'failureRate']"
      ></dt-row>
    </dt-table>
  `,
  // tslint:enable
})
export class TableWithInfoGroupCellExample {
  dataSource: object[] = [
    {
      service: 'BookingService',
      location: 'ruxit-dev-us-east-BB',
      responseTime: 72,
      failureRate: 0,
    },
    {
      service: 'EasyTravelWebserver:8079',
      location: 'ruxti-dev-us-east-THIRD',
      responseTime: 71.3,
      failureRate: 0.9,
    },
    {
      service: 'easyTRavelBusiness',
      location: 'gn-rx-ub12-cl04v.clients.emeea.cpwr.corp',
      responseTime: 66.2,
      failureRate: 0.1,
    },
    {
      service: 'easyTravel',
      location: 'L-W864-APMDay3',
      responseTime: 44,
      failureRate: 0,
    },
  ];
}
