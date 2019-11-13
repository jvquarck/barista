import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { DtIconType } from '@dynatrace/dt-iconpack';
import { BehaviorSubject, Observable, Subscription, combineLatest } from 'rxjs';
import { debounceTime, map, take, tap } from 'rxjs/operators';

import { Viewport } from './viewport';

@Component({
  selector: 'docs-async-icon',
  template: `
    <ng-container>
      <dt-icon [name]="name" *ngIf="_show"></dt-icon>
      <p>{{ name }}</p>
    </ng-container>
  `,
  styles: ['dt-icon { display: inline-block; width: 3rem; height: 3rem; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsAsyncIcon implements OnDestroy {
  @Input() name: DtIconType;
  _show = false;

  private _viewportEnterSub: Subscription;

  constructor(
    viewport: Viewport,
    el: ElementRef,
    changeDetector: ChangeDetectorRef,
  ) {
    this._viewportEnterSub = viewport
      .elementEnter(el)
      .pipe(take(1))
      .subscribe(() => {
        this._show = true;
        changeDetector.detectChanges();
      });
  }

  ngOnDestroy(): void {
    if (this._viewportEnterSub) {
      this._viewportEnterSub.unsubscribe();
    }
  }
}

@Component({
  selector: 'component-barista-example',
  template: `
    <input
      #input
      type="text"
      dtInput
      placeholder="Filter by"
      (input)="_onInputChange($event)"
      aria-label="Filter icons"
    />
    <div class="all-icons-container">
      <docs-async-icon
        *ngFor="let name of _icons$ | async"
        [name]="name"
      ></docs-async-icon>
    </div>
  `,
  styles: [
    `
      .all-icons-container {
        display: grid;
        grid-auto-columns: max-content;
        grid-gap: 10px;
        grid-template-columns: repeat(auto-fill, minmax(min-content, 200px));
      }
    `,
    'docs-async-icon { display: inline-block; padding: 1.5rem; text-align: center; }',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [Viewport],
})
export class IconAllExample implements OnDestroy {
  @ViewChild('input', { static: true }) _inputEl: ElementRef;
  _icons$: Observable<string[]>;
  private _filterValue = new BehaviorSubject<string>('');

  constructor(private _httpClient: HttpClient, viewport: Viewport) {
    this._icons$ = combineLatest([
      this._httpClient
        .get('/assets/icons/metadata.json')
        .pipe(map((res: { icons: string[] }) => res.icons || [])),
      this._filterValue.pipe(
        debounceTime(200),
        map(value => value.toUpperCase()),
      ),
    ]).pipe(
      map(([icons, filterValue]) =>
        icons.filter(
          icon =>
            filterValue === '' ||
            icon.toUpperCase().indexOf(filterValue) !== -1,
        ),
      ),
      tap(() => {
        setTimeout(() => {
          viewport.refresh();
        }, 0);
      }),
    );
  }

  ngOnDestroy(): void {
    this._filterValue.complete();
  }

  _onInputChange(event: Event): void {
    // We always have to stop propagation on the change event.
    // Otherwise the change event, from the input element, will bubble up and
    // emit its event object to the `change` output.
    event.stopPropagation();
    this._filterValue.next(this._inputEl.nativeElement.value || '');
  }
}
