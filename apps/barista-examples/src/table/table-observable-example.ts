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
import { BehaviorSubject, Subscription, interval } from 'rxjs';
import { take } from 'rxjs/operators';

const MAX_ROWS = 5;

@Component({
  selector: 'component-barista-example',
  styles: ['button { margin-top: 16px; }'],
  // tslint:disable
  template: `
    <dt-table [dataSource]="dataSource">
      <ng-container dtColumnDef="host" dtColumnAlign="text">
        <dt-header-cell *dtHeaderCellDef>Host</dt-header-cell>
        <dt-cell *dtCellDef="let row">{{ row.host }}</dt-cell>
      </ng-container>

      <ng-container dtColumnDef="cpu" dtColumnAlign="text">
        <dt-header-cell *dtHeaderCellDef>CPU</dt-header-cell>
        <dt-cell *dtCellDef="let row">{{ row.cpu }}</dt-cell>
      </ng-container>

      <ng-container dtColumnDef="memory" dtColumnAlign="number">
        <dt-header-cell *dtHeaderCellDef>Memory</dt-header-cell>
        <dt-cell *dtCellDef="let row">{{ row.memory }}</dt-cell>
      </ng-container>

      <ng-container dtColumnDef="traffic" dtColumnAlign="control">
        <dt-header-cell *dtHeaderCellDef>Network traffic</dt-header-cell>
        <dt-cell *dtCellDef="let row">{{ row.traffic }}</dt-cell>
      </ng-container>

      <dt-header-row
        *dtHeaderRowDef="['host', 'cpu', 'memory', 'traffic']"
      ></dt-header-row>
      <dt-row
        *dtRowDef="let row; columns: ['host', 'cpu', 'memory', 'traffic']"
      ></dt-row>
    </dt-table>
    <button dt-button (click)="startSubscription()">Start subscription</button>
    <button dt-button variant="secondary" (click)="clearRows()">Clear</button>
  `,
  // tslint:enable
})
export class TableObservableExample {
  dataSource = new BehaviorSubject<object[]>([]);

  // tslint:disable-next-line:no-magic-numbers
  private source = interval(1000);
  subscription: Subscription;

  startSubscription(): void {
    this.subscription = this.source.pipe(take(MAX_ROWS)).subscribe((): void => {
      this.getAnotherRow();
    });
  }

  clearRows(): void {
    this.dataSource.next([]);
  }

  getAnotherRow(): void {
    // tslint:disable
    this.dataSource.next([
      ...this.dataSource.value,
      {
        host: 'et-demo-2-win4',
        cpu: `${(Math.random() * 10).toFixed(2)} %`,
        memory: `${(Math.random() * 10).toFixed(2)} % of ${(
          Math.random() * 40
        ).toFixed(2)} GB`,
        traffic: `${(Math.random() * 100).toFixed(2)} Mbit/s`,
      },
    ]);
    // tslint:enable
  }
}
