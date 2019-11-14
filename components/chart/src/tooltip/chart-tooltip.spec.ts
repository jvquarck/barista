// tslint:disable no-lifecycle-call no-use-before-declare no-magic-numbers
// tslint:disable no-any max-file-line-count no-unbound-method use-component-selector

import { OverlayContainer } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  async,
  fakeAsync,
  flush,
  inject,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import {
  DtChart,
  DtChartModule,
  DtChartOptions,
  DtChartSeries,
} from '@dynatrace/barista-components/chart';
import { DtKeyValueListModule } from '@dynatrace/barista-components/key-value-list';
import { DtOverlayModule } from '@dynatrace/barista-components/overlay';
import { DtThemingModule } from '@dynatrace/barista-components/theming';

import { createComponent } from '../../../testing/create-component';
import { MockIntersectionObserver } from '../../../testing/mock-intersection-observer';
import { DtChartTooltipData } from '../highcharts/highcharts-tooltip-types';

describe('DtChartTooltip', () => {
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;
  let chartComponent: DtChart;
  let fixture: ComponentFixture<ChartTest>;
  const mockIntersectionObserver = new MockIntersectionObserver();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DtChartModule,
        DtThemingModule,
        DtKeyValueListModule,
        DtOverlayModule,
        NoopAnimationsModule,
      ],
      declarations: [ChartTest],
    });

    TestBed.compileComponents();

    inject([OverlayContainer], (oc: OverlayContainer) => {
      overlayContainer = oc;
      overlayContainerElement = oc.getContainerElement();
    })();

    fixture = createComponent(ChartTest);
    const chartDebugElement = fixture.debugElement.query(By.css('dt-chart'));
    chartComponent = chartDebugElement.componentInstance;
  }));

  afterEach(inject(
    [OverlayContainer],
    (currentOverlayContainer: OverlayContainer) => {
      // Since we're resetting the testing module in some of the tests,
      // we can potentially have multiple overlay containers.
      currentOverlayContainer.ngOnDestroy();
      overlayContainer.ngOnDestroy();

      mockIntersectionObserver.clearMock();
    },
  ));

  it('should dismiss the overlay when the tooltip close event is called', fakeAsync(() => {
    mockIntersectionObserver.mockAllIsIntersecting(true);
    chartComponent.tooltipDataChange.next({
      data: DUMMY_TOOLTIP_DATA_LINE_SERIES,
    });
    fixture.detectChanges();
    chartComponent.tooltipOpenChange.next(false);
    fixture.detectChanges();
    tick();
    flush();
    expect(overlayContainerElement.innerHTML).toEqual('');
  }));

  it('should dismiss the overlay when the tooltip data event is called but has no data for the point', fakeAsync(() => {
    mockIntersectionObserver.mockAllIsIntersecting(true);
    const newData: DtChartTooltipData = { ...DUMMY_TOOLTIP_DATA_LINE_SERIES };
    newData.points = undefined;
    chartComponent.tooltipDataChange.next({ data: newData });
    fixture.detectChanges();
    tick();
    flush();
    expect(overlayContainerElement.innerHTML).toEqual('');
  }));

  it('should show the tooltip if the chart is in the viewport', fakeAsync(() => {
    mockIntersectionObserver.mockAllIsIntersecting(true);
    chartComponent.tooltipDataChange.next({
      data: DUMMY_TOOLTIP_DATA_LINE_SERIES,
    });
    fixture.detectChanges();
    tick();
    flush();
    expect(overlayContainerElement.innerHTML).not.toEqual('');
  }));

  it('should not show the tooltip if the chart is not in the viewport', fakeAsync(() => {
    mockIntersectionObserver.mockAllIsIntersecting(false);
    chartComponent.tooltipDataChange.next({
      data: DUMMY_TOOLTIP_DATA_LINE_SERIES,
    });
    fixture.detectChanges();
    tick();
    flush();
    expect(overlayContainerElement.innerHTML).toEqual('');
  }));

  describe('content', () => {
    beforeEach(fakeAsync(() => {
      mockIntersectionObserver.mockAllIsIntersecting(true);
      chartComponent.tooltipDataChange.next({
        data: DUMMY_TOOLTIP_DATA_LINE_SERIES,
      });
      fixture.detectChanges();
    }));

    it('should be a key value list with the data', () => {
      expect(overlayContainerElement.textContent).toContain('Actions/min');
      expect(overlayContainerElement.textContent).toContain('1000');
      expect(overlayContainerElement.innerHTML).toContain('dt-key-value-list');
    });

    it('should be updated with new data', () => {
      const newData: DtChartTooltipData = { ...DUMMY_TOOLTIP_DATA_LINE_SERIES };
      newData.points![0].point.y = 54321;

      chartComponent.tooltipDataChange.next({ data: newData });
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).not.toContain('1000');
      expect(overlayContainerElement.textContent).toContain('54321');
    });
  });
});

@Component({
  selector: 'dt-line',
  template: `
    <dt-chart [series]="series" [options]="options">
      <dt-chart-tooltip>
        <ng-template let-series>
          <dt-key-value-list style="min-width: 100px">
            <dt-key-value-list-item *ngFor="let data of series.points">
              <dt-key-value-list-key>
                {{ data.series.name }}
              </dt-key-value-list-key>
              <dt-key-value-list-value>
                {{ data.point.y }}
              </dt-key-value-list-value>
            </dt-key-value-list-item>
          </dt-key-value-list>
        </ng-template>
      </dt-chart-tooltip>
    </dt-chart>
  `,
})
class ChartTest {
  options: DtChartOptions = {
    chart: {
      type: 'line',
    },
    xAxis: {
      type: 'datetime',
    },
    yAxis: {
      min: 100,
      max: 200,
    },
  };
  series: DtChartSeries[] = [
    {
      name: 'Actions/min',
      id: 'someMetricId',
      data: [[1370304000000, 140], [1370390400000, 120]],
    },
  ];
}

const DUMMY_TOOLTIP_DATA_LINE_SERIES: DtChartTooltipData = {
  x: 0,
  y: 0,
  points: [
    {
      x: 0,
      y: 0,
      total: 1,
      color: '#ffffff',
      colorIndex: 0,
      percentage: 0,
      point: {
        x: 1,
        y: 1000,
        tooltipPos: [1, 2, 3],
      },
      series: {
        name: 'Actions/min',
        xAxis: {
          toPixels: x => x * 2,
        },
        yAxis: {
          toPixels: y => y * 2,
        },
      },
      key: 0,
    },
  ],
};
