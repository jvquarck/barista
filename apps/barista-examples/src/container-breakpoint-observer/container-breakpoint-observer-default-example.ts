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

import { DtContainerBreakpointObserver } from '@dynatrace/barista-components/container-breakpoint-observer';

@Component({
  selector: 'container-breakpoint-observer-barista-example',
  template: `
    <dt-container-breakpoint-observer>
      <p>This is some placeholder text</p>
      <button dt-button>Some button</button>
    </dt-container-breakpoint-observer>
  `,
})
export class ContainerBreakpointObserverDefaultExample implements OnInit {
  @ViewChild(DtContainerBreakpointObserver, { static: true })
  breakpointObserver: DtContainerBreakpointObserver;

  ngOnInit(): void {
    this.breakpointObserver.observe('(min-width: 400px)').subscribe(event => {
      // tslint:disable-next-line: no-console
      console.log(`Matches '(min-width: 400px)':`, event.matches);
    });
  }
}
