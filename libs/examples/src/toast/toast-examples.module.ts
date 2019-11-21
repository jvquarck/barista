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
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DtButtonModule } from '@dynatrace/barista-components/button';
import { DtFormFieldModule } from '@dynatrace/barista-components/form-field';
import { DtExampleToastDefault } from './toast-default-example/toast-default-example';
import { DtExampleToastDynamicMsg } from './toast-dynamic-msg-example/toast-dynamic-msg-example';

export const DT_TOAST_EXAMPLES = [
  DtExampleToastDefault,
  DtExampleToastDynamicMsg,
];
@NgModule({
  imports: [CommonModule, FormsModule, DtButtonModule, DtFormFieldModule],
  declarations: [...DT_TOAST_EXAMPLES],
  entryComponents: [...DT_TOAST_EXAMPLES],
})
export class DtToastExamplesModule {}
