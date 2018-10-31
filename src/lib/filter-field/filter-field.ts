import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  ContentChildren,
  AfterContentInit,
  QueryList,
  ChangeDetectorRef,
  OnDestroy,
  EventEmitter,
  Output,
  NgZone,
} from '@angular/core';
import { ENTER } from '@angular/cdk/keycodes';
import { DtAutocomplete, DtAutocompleteSelectedEvent, DtAutocompleteTrigger } from '@dynatrace/angular-components/autocomplete';
import {
  DtFilterFieldNode,
  DtFilterFieldNodeValue,
  DtFilterFieldFilterNode,
  DtFilterFieldGroup,
  getParents as getParentsForNode,
} from './nodes/filter-field-node';
import { switchMap, map, takeUntil, filter, startWith } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ConnectedPosition } from '@angular/cdk/overlay';

export class DtActiveFilterChangeEvent {
  constructor(
    public rootNodes: DtFilterFieldNode[],
    public activeNode: DtFilterFieldNode,
    public path: DtFilterFieldGroup[] = [],
    public source: DtFilterField
  ) { }

  submitActiveFilter(viewValue?: string): void {
    this.activeNode.viewValue = viewValue;
    this.source._finishCurrentNode();
  }
}

// tslint:disable:no-any
@Component({
  moduleId: module.id,
  selector: 'dt-filter-field',
  exportAs: 'dtFilterField',
  templateUrl: 'filter-field.html',
  styleUrls: ['filter-field.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DtFilterField implements AfterContentInit, OnDestroy {

  @Output() inputChange = new EventEmitter<string>();
  @Output() activeFilterChange = new EventEmitter<DtActiveFilterChangeEvent>();
  @Output() change = new EventEmitter<void>();

  @ViewChild('autocompleteInput') _autocompleteInputEl: ElementRef;
  @ViewChild('freeTextInput') _freeTextInputEl: ElementRef;
  @ViewChild(DtAutocompleteTrigger) _autocompleteTrigger: DtAutocompleteTrigger<any>;
  @ContentChildren(DtAutocomplete) _autocompletes: QueryList<DtAutocomplete<any>>;

  get _prefixNodes(): DtFilterFieldNode[] {
    return this._rootNodes.slice(0, this._currentNode ? this._rootNodes.indexOf(this._currentNode) : undefined);
  }
  get _suffixNodes(): DtFilterFieldNode[] {
    return this._currentNode ? this._rootNodes.slice(this._rootNodes.indexOf(this._currentNode) + 1) : [];
  }

  get _filterByLabel(): string {
    const lastProperty = this._currentNode && this._currentNode.properties.length ?
      this._currentNode.properties[this._currentNode.properties.length - 1] : null;
    return lastProperty ? ` ${(lastProperty as DtFilterFieldNodeValue<any>).toString()}:` : '';
  }

  _rootNodes: DtFilterFieldNode[] = [];
  _currentNode: DtFilterFieldFilterNode | null = null;
  // tslint:disable-next-line:no-any
  _autocomplete: DtAutocomplete<any> | null = null;

  /** Emits whenever the component is destroyed. */
  private readonly _destroy = new Subject<void>();

  /**
   * @internal
   * Whether the autocomplete input field is focused.
   */
  _isAutocompleteTriggerFocused = false;

  /**
   * @internal
   * Value of the internal input elements.
   */
  _inputValue = '';

  constructor(private _changeDetectorRef: ChangeDetectorRef, private _zone: NgZone) { }

  ngAfterContentInit(): void {
    if (this._autocompletes) {
      const autocomplete$ = this._autocompletes.changes.pipe(
        startWith(null),
        map(() => this._autocompletes.length ? this._autocompletes.first : null));

      autocomplete$.pipe(takeUntil(this._destroy)).subscribe((autocomplete) => {
        this._autocomplete = autocomplete;
        this._changeDetectorRef.markForCheck();
      });

      autocomplete$.pipe(
        takeUntil(this._destroy),
        filter((autocomplete) => autocomplete !== null),
        // tslint:disable-next-line:no-any
        switchMap((autocomplete: DtAutocomplete<any>) => autocomplete.optionSelected!))
        // tslint:disable-next-line:no-any
        .subscribe((event: DtAutocompleteSelectedEvent<any>) => this._handleAutocompleteSelected(event));
    }

    // When the autocomplete closes after the user has selected an option we need to reopen the autocomplete panel
    // if the input field is still focused.
    // The reopen can be done once all microtasks have been finished (the zone is stable) and the rendering has been finished.
    this._zone.onStable.pipe(takeUntil(this._destroy)).subscribe(() => {
      if (this._isAutocompleteTriggerFocused && this._autocomplete && !this._autocomplete.isOpen && this._autocompleteTrigger) {
        this._autocompleteTrigger.openPanel();
      }
    });
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }

  _finishCurrentNode(): void {
    if (this._currentNode) {
      this._currentNode = null;
    }
  }

  /**
   * @internal
   * Keep track of the values in the input fields. Write the current value to the _inputValue property
   */
  _handleInputChange(event: Event): void {
    const value = event.srcElement instanceof HTMLInputElement ? event.srcElement.value : this._inputValue;
    if (value !== this._inputValue) {
      this._inputValue = value;
      this.inputChange.emit(value);
      this._changeDetectorRef.markForCheck();
    }
  }

  // _handleInputKeyUp(event: KeyboardEvent): void {
  //   const value = event.srcElement instanceof HTMLInputElement ? event.srcElement.value : this._inputValue;
  //   const keyCode = event.keyCode;

  //   if (this._inputValue !== value) {
  //     console.log('setting input value', value);
  //     this._inputValue = value;
  //     this.inputChange.emit(value);
  //   }

  //   this._changeDetectorRef.markForCheck();
  //   // if (keyCode === ENTER && !this._autocomplete) {
  //   //   event.preventDefault();
  //   //   this._handleInputSubmitted(value);
  //   // } else
  // }

  private _handleAutocompleteSelected(event: DtAutocompleteSelectedEvent<any>): void {
    const property = new DtFilterFieldNodeValue(event.option.value, event.option.viewValue);
    let currentNode = this._currentNode;
    if (!currentNode) {
      // TODO @thomas.pink: Handle non root nodes (parents, path)
      currentNode = new DtFilterFieldFilterNode();
      this._currentNode = currentNode;
      this._rootNodes.push(currentNode);
    }
    currentNode.properties.push(property);

    // Reset input value to empty string after handling the value provided by the autocomplete.
    // Otherwise the value of the autocomplete would be in the input elements.
    this._writeInputValue('');

    // Clear any previous selected option.
    this._autocomplete!.options.forEach((option) => {
      if (option.selected) { option.deselect(); }
    });

    this.activeFilterChange.emit(new DtActiveFilterChangeEvent(
      this._rootNodes,
      currentNode,
      getParentsForNode(currentNode),
      this
    ));
    this._changeDetectorRef.markForCheck();
  }

  private _handleInputSubmitted(value: string): void {

  }

  /** Write a value to the native input elements and set _inputValue property  */
  private _writeInputValue(value: string): void {
    // tslint:disable:no-unused-expression
    this._autocompleteInputEl && (this._autocompleteInputEl.nativeElement.value = value);
    this._freeTextInputEl && (this._freeTextInputEl.nativeElement.value = value);
    // tslint:enable:no-unused-expression
    if (this._inputValue !== value) {
      this._inputValue = value;
      this.inputChange.emit(value);
      this._changeDetectorRef.markForCheck();
    }
  }
}
