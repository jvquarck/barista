import { coerceElement } from '@angular/cdk/coercion';
import { ElementRef, Renderer2 } from '@angular/core';

import { isNumber, isString } from './type-util';

/**
 * Replaces an old class on an element with a new on.
 * Both can also be null. In this case it just adds the new one or removes the old one.
 * If the optional Renderer is not provided it uses the browser specific classList.
 */
export function replaceCssClass(
  elOrRef: any, // tslint:disable-line:no-any
  oldClass: string | null,
  newClass: string | null,
  renderer?: Renderer2,
): void {
  const el = elOrRef.nativeElement || elOrRef;
  if (oldClass) {
    removeCssClass(el, oldClass, renderer);
  }
  if (newClass) {
    addCssClass(el, newClass, renderer);
  }
}

/**
 * Adds or removes a class based on a provided boolean value
 * @param condition A boolean value that decides whether a class should be added or removed
 * @param el Element where the class should be toggled
 * @param name Class name that should be added or removed
 * @param renderer Optional renderer to set the class.
 */
export function toggleCssClass(
  condition: boolean,
  // tslint:disable-next-line: no-any
  el: any,
  name: string,
  renderer?: Renderer2,
): void {
  if (condition) {
    addCssClass(el, name, renderer);
  } else {
    removeCssClass(el, name, renderer);
  }
}

// tslint:disable-next-line:no-any
export function addCssClass(el: any, name: string, renderer?: Renderer2): void {
  if (renderer) {
    renderer.addClass(el, name);
  } else {
    el.classList.add(name);
  }
}

export function removeCssClass(
  el: any, // tslint:disable-line:no-any
  name: string,
  renderer?: Renderer2,
): void {
  if (renderer) {
    renderer.removeClass(el, name);
  } else {
    el.classList.remove(name);
  }
}

/**
 * Helper function to safely check if an element has a class
 * Also works with elements in svgs
 */
// tslint:disable-next-line:no-any
export function hasCssClass(el: any, name: string): boolean {
  // classList cant be used safely for elements in svgs - thats why we are using getAttribute
  const classes = el.getAttribute('class') || '';
  return classes.split(' ').includes(name);
}

/**
 * Reads the key code from a keyboard event.
 * It is needed because event.keyCode is deprecated an will lead to multiple tslint errors.
 * This function will move the the event.keyKode to a single point where we disable the tslint rule.
 */
export function readKeyCode(event: KeyboardEvent): number {
  // tslint:disable-next-line:deprecation
  return event.keyCode;
}

/** Parses a value and a unit from a string / number if possible */
export function parseCssValue(
  // tslint:disable-next-line: no-any
  input: any,
): { value: number; unit: string } | null {
  if (isNumber(input)) {
    return { value: parseFloat(input), unit: 'px' };
  }
  if (isString(input)) {
    const result = input.match(/^[\d\.]+/);
    let unit = 'px';
    let value: number;
    if (result && result.length) {
      value = parseFloat(result[0]);
      const unitParsed = input.slice(result[0].length).trim();
      unit = unitParsed !== '' ? unitParsed : unit;
      return { value, unit };
    }
  }
  return null;
}

/**
 * Returns the bounding client rect of an element or element ref.
 * It is shimmed on platforms where this function is not available.
 * In this case a client rect with all properties set to `0` is returned.
 *
 * The client rect is also extended with the property `isNativeRect`.
 * This property is set to false, if a shimmed client rect is return.
 */
export function getElementBoundingClientRect(
  el: Element | ElementRef,
): ClientRect & {
  /** Whether the returned client rect is provided by the platform or is shimmed. */
  isNativeRect: boolean;
} {
  const element: Element = coerceElement(el);

  const clientRect: ClientRect | DOMRect =
    element && element.getBoundingClientRect
      ? element.getBoundingClientRect()
      : {
          bottom: 0,
          height: 0,
          left: 0,
          right: 0,
          top: 0,
          width: 0,
        };

  return {
    top: clientRect.top,
    height: clientRect.height,
    bottom: clientRect.bottom,
    left: clientRect.left,
    right: clientRect.right,
    width: clientRect.width,
    isNativeRect: element.getBoundingClientRect && !!window,
  };
}
