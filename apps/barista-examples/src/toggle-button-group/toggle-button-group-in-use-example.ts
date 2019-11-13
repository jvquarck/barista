import { Component, ViewChild } from '@angular/core';

import {
  DtToggleButtonGroup,
  DtToggleButtonItem,
} from '@dynatrace/barista-components/toggle-button-group';

@Component({
  selector: 'component-barista-example',
  template: `
    <dt-toggle-button-group (click)="getSelectedItem()">
      <div class="dt-toggle-button-group-in-use-grid">
        <button dt-toggle-button-item value="1">
          <dt-toggle-button-item-icon>
            <dt-icon name="cloud"></dt-icon>
          </dt-toggle-button-item-icon>
          1 CDN domain detected
        </button>
        <button dt-toggle-button-item value="2">
          <dt-toggle-button-item-icon>
            <dt-icon name="resourcerequest"></dt-icon>
          </dt-toggle-button-item-icon>
          23 resource requests
        </button>
        <button dt-toggle-button-item value="3">
          <dt-toggle-button-item-icon>
            <dt-icon name="cloud"></dt-icon>
          </dt-toggle-button-item-icon>
          1 CDN resource
        </button>
      </div>
    </dt-toggle-button-group>
    <div class="timeline-chart-container">
      <dt-timeline-chart value="0.37" unit="s">
        <dt-timeline-chart-timing-marker value="0.02" identifier="R">
          Request start 0.02s
        </dt-timeline-chart-timing-marker>
        <dt-timeline-chart-timing-marker value="0.04" identifier="S">
          Speed index 0.04s
        </dt-timeline-chart-timing-marker>
        <dt-timeline-chart-timing-marker value="0.17" identifier="I">
          DOM interactive 0.17s
        </dt-timeline-chart-timing-marker>
        <dt-timeline-chart-timing-marker value="0.37" identifier="L">
          Load event start 0.37s
        </dt-timeline-chart-timing-marker>

        <dt-timeline-chart-key-timing-marker value="0.03" identifier="V">
          Visually complete
        </dt-timeline-chart-key-timing-marker>
      </dt-timeline-chart>
    </div>
  `,
  styles: [
    `
      .dt-toggle-button-group-in-use-grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-column-gap: 12px;
      }

      .timeline-chart-container {
        margin-top: 22px;
      }
    `,
  ],
})
export class ToggleButtonGroupInUseExample<T> {
  @ViewChild(DtToggleButtonGroup, { static: true })
  dtToggleButtonGroup: DtToggleButtonGroup<T>;

  selectedItem: DtToggleButtonItem<T> | null;

  getSelectedItem(): void {
    this.selectedItem = this.dtToggleButtonGroup.selectedItem;
  }
}
