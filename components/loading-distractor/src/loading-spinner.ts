import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'dt-loading-spinner',
  exportAs: 'dtLoadingSpinner',
  templateUrl: 'loading-spinner.html',
  styleUrls: ['loading-spinner.scss'],
  host: {
    role: 'progressbar',
    'aria-busy': 'true',
    'aria-live': 'assertive',
    '[attr.aria-label]': 'ariaLabel',
    '[attr.aria-labeledby]': 'ariaLabelledby',
  },
  encapsulation: ViewEncapsulation.Emulated,
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DtLoadingSpinner {
  // We have to disable the no-input-rename rule here because the
  // minus character can't be used in an variable name.
  // tslint:disable:no-input-rename

  /** The aria-labelledby attribute. */
  @Input('aria-labelledby') ariaLabelledby: string;

  /** The aria-label attribute. */
  @Input('aria-label') ariaLabel: string;
  // tslint:enable:no-input-rename
}
