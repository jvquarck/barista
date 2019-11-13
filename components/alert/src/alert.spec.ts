import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DtAlert, DtAlertModule } from '@dynatrace/barista-components/alert';
import { DtIconModule } from '@dynatrace/barista-components/icon';

import { createComponent } from '../../testing/create-component';

describe('DtAlert', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        DtIconModule.forRoot({ svgIconLocation: `{{name}}.svg` }),
        DtAlertModule,
      ],
      declarations: [TestApp, TestAppEmpty],
    });

    TestBed.compileComponents();
  }));

  it('expects css class to be present', () => {
    const fixture = createComponent(TestApp);

    const tileNativeElement = fixture.debugElement.nativeElement.querySelector(
      'dt-alert',
    );
    expect(tileNativeElement.classList.contains('dt-alert')).toBeTruthy();
  });

  it('expects correct css class after change', () => {
    const fixture = createComponent(TestApp);

    const tileNativeElement = fixture.debugElement.nativeElement.querySelector(
      'dt-alert',
    );

    const groupDebugElement = fixture.debugElement.query(By.directive(DtAlert));
    const groupInstance = groupDebugElement.injector.get<DtAlert>(DtAlert);

    groupInstance.severity = 'warning';
    fixture.detectChanges();

    expect(
      tileNativeElement.classList.contains('dt-alert-warning'),
    ).toBeTruthy();

    expect(tileNativeElement.classList.contains('dt-alert-error')).toBeFalsy();
  });

  it('expects no css class to be present by default', () => {
    const fixture = createComponent(TestAppEmpty);

    const tileNativeElement = fixture.debugElement.nativeElement.querySelector(
      'dt-alert',
    );
    expect(tileNativeElement.classList.contains('dt-alert-error')).toBeFalsy();
    expect(
      tileNativeElement.classList.contains('dt-alert-warning'),
    ).toBeFalsy();
  });
});

/** Test component that contains an DtAlert. */
@Component({
  selector: 'dt-test-app',
  template: `
    <dt-alert severity="error"></dt-alert>
  `,
})
class TestApp {}

/** Test component that is not visible by default. */
@Component({
  selector: 'dt-test-app-empty',
  template: `
    <dt-alert></dt-alert>
  `,
})
class TestAppEmpty {}
