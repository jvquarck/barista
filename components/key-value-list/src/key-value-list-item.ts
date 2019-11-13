import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  ViewEncapsulation,
} from '@angular/core';

/** Key of a keyValueList, needed as it's used as a selector in the API. */
@Directive({
  selector: `dt-key-value-list-key, [dtKeyValueListKey]`,
  exportAs: 'dtKeyValueListKey',
})
export class DtKeyValueListKey {}

/** Value of a keyValueList, needed as it's used as a selector in the API. */
@Directive({
  selector: `dt-key-value-list-value, [dtKeyValueListValue]`,
  exportAs: 'dtKeyValueListValue',
})
export class DtKeyValueListValue {}

@Component({
  selector: 'dt-key-value-list-item',
  templateUrl: 'key-value-list-item.html',
  styleUrls: ['key-value-list-item.scss'],
  host: {
    class: 'dt-key-value-list-item',
  },
  exportAs: 'dtKeyValueListItem',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
})
export class DtKeyValueListItem {}
