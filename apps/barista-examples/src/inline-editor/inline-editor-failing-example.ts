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
import { Observable } from 'rxjs';

const TIMEOUT_MS = 2000;

@Component({
  selector: 'component-barista-example',
  template: `
    <em
      dt-inline-editor
      [(ngModel)]="sampleModel"
      [onRemoteSave]="failingSaveFunction"
      aria-label-save="Save text"
      aria-label-cancel="Cancel and discard changes"
    ></em>
  `,
})
export class InlineEditorFailingExample {
  sampleModel = 'text content';

  failingSaveFunction(): Observable<void> {
    return new Observable<void>(observer => {
      setTimeout(() => {
        observer.error();
      }, TIMEOUT_MS);
    });
  }
}
