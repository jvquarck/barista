// tslint:disable no-lifecycle-call no-use-before-declare no-magic-numbers
// tslint:disable no-any max-file-line-count no-unbound-method use-component-selector

import { HttpClientModule, HttpXhrBackend } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, DebugElement } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DtIconModule } from '@dynatrace/barista-components/icon';
import {
  DtShowMore,
  DtShowMoreModule,
} from '@dynatrace/barista-components/show-more';

import { createComponent } from '../../testing/create-component';

describe('DtShowMore', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DtShowMoreModule,
        HttpClientModule,
        DtIconModule.forRoot({ svgIconLocation: `{{name}}.svg` }),
      ],
      declarations: [TestApp],
      providers: [
        {
          provide: HttpXhrBackend,
          useClass: HttpClientTestingModule,
        },
      ],
    });

    TestBed.compileComponents();
  }));

  describe('show-more', () => {
    let fixture;
    let testComponent: TestApp;
    let instanceDebugElement: DebugElement;
    let instanceElement: HTMLElement;

    beforeEach(async(() => {
      fixture = createComponent(TestApp);
      testComponent = fixture.componentInstance;
      instanceDebugElement = fixture.debugElement.query(
        By.directive(DtShowMore),
      );
      instanceElement = instanceDebugElement.nativeElement;
    }));

    it('should not contain less style', () => {
      expect(instanceElement.classList).not.toContain('dt-show-more-show-less');
    });

    it('should have less styles', () => {
      testComponent.showLess = true;
      fixture.detectChanges();

      expect(instanceElement.classList).toContain('dt-show-more-show-less');
    });

    it('should fire event', () => {
      expect(testComponent.eventsFired).toBe(0);

      instanceElement.click();

      expect(testComponent.eventsFired).toBe(1);
    });
  });
});

@Component({
  selector: 'dt-test-app',
  template: `
    <dt-show-more [showLess]="showLess" (changed)="eventFired()">
      More
    </dt-show-more>
  `,
})
class TestApp {
  showLess = false;
  eventsFired = 0;

  eventFired(): void {
    this.eventsFired++;
  }
}
