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

import { Component, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'ba-page-content',
  template: '',
})
export class BaPageContent {
  @Input()
  get data(): string {
    return this._data;
  }
  set data(value: string) {
    this._data = value;
    // TODO: is this okay?
    // tslint:disable-next-line dt-ban-inner-html
    this._elementRef.nativeElement.innerHTML = value;
    this._elementRef.nativeElement.setAttribute('id', 'all-content');
  }
  private _data = '';

  constructor(private _elementRef: ElementRef<HTMLElement>) {}
}
