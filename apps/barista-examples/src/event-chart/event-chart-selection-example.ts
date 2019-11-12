import { Component } from '@angular/core';

import { DtEventChartSelectedEvent } from '@dynatrace/barista-components/event-chart';

@Component({
  selector: 'event-chart-demo',
  template: `
    <dt-event-chart>
      <dt-event-chart-event
        (selected)="triggerSelection($event)"
        value="0"
        lane="xhr"
      ></dt-event-chart-event>
      <dt-event-chart-event
        (selected)="triggerSelection($event)"
        value="15"
        lane="xhr"
      ></dt-event-chart-event>
      <dt-event-chart-event
        (selected)="triggerSelection($event)"
        value="25"
        lane="xhr"
      ></dt-event-chart-event>
      <dt-event-chart-event
        (selected)="triggerSelection($event)"
        value="10"
        lane="user-event"
      ></dt-event-chart-event>
      <dt-event-chart-event
        (selected)="triggerSelection($event)"
        value="35"
        lane="xhr"
        duration="15"
      ></dt-event-chart-event>
      <dt-event-chart-event
        (selected)="triggerSelection($event)"
        value="75"
        lane="user-event"
      ></dt-event-chart-event>

      <dt-event-chart-lane name="xhr" label="XHR"></dt-event-chart-lane>
      <dt-event-chart-lane
        name="user-event"
        label="User event"
      ></dt-event-chart-lane>
    </dt-event-chart>

    <div>See selection output in the browsers console.</div>
  `,
})
export class EventChartSelectionExample {
  _lastSelected: DtEventChartSelectedEvent<string>;
  triggerSelection(event: DtEventChartSelectedEvent<string>): void {
    // tslint:disable-next-line: no-console
    console.log(event);
  }
}
