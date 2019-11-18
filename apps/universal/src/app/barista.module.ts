import { DtAlertModule } from '@dynatrace/barista-components/alert';
import { DtAutocompleteModule } from '@dynatrace/barista-components/autocomplete';
import { DtButtonGroupModule } from '@dynatrace/barista-components/button-group';
import { DtButtonModule } from '@dynatrace/barista-components/button';
import { DtCardModule } from '@dynatrace/barista-components/card';
import { DtCheckboxModule } from '@dynatrace/barista-components/checkbox';
import { DtConsumptionModule } from '@dynatrace/barista-components/consumption';
import { DtContainerBreakpointObserverModule } from '@dynatrace/barista-components/container-breakpoint-observer';
import { DtContextDialogModule } from '@dynatrace/barista-components/context-dialog';
import { DtCopyToClipboardModule } from '@dynatrace/barista-components/copy-to-clipboard';
import { DtDrawerModule } from '@dynatrace/barista-components/drawer';
import { DtEmptyStateModule } from '@dynatrace/barista-components/empty-state';
import { DtEventChartModule } from '@dynatrace/barista-components/event-chart';
import { DtExpandableTextModule } from '@dynatrace/barista-components/expandable-text';
import { DtFilterFieldModule } from '@dynatrace/barista-components/filter-field';
import { DtHighlightModule } from '@dynatrace/barista-components/highlight';
import { DtIconModule } from '@dynatrace/barista-components/icon';
import { DtInfoGroupModule } from '@dynatrace/barista-components/info-group';
import { DtInputModule } from '@dynatrace/barista-components/input';
import { DtLoadingDistractorModule } from '@dynatrace/barista-components/loading-distractor';
import { DtMenuModule } from '@dynatrace/barista-components/menu';
import { DtOverlayModule } from '@dynatrace/barista-components/overlay';
import { DtPaginationModule } from '@dynatrace/barista-components/pagination';
import { DtProgressBarModule } from '@dynatrace/barista-components/progress-bar';
import { DtProgressCircleModule } from '@dynatrace/barista-components/progress-circle';
import { DtRadioModule } from '@dynatrace/barista-components/radio';
import { DtSelectModule } from '@dynatrace/barista-components/select';
import { DtShowMoreModule } from '@dynatrace/barista-components/show-more';
import { DtStepperModule } from '@dynatrace/barista-components/stepper';
import { DtSwitchModule } from '@dynatrace/barista-components/switch';
import { DtTableModule } from '@dynatrace/barista-components/table';
import { DtTagModule } from '@dynatrace/barista-components/tag';
import { DtTileModule } from '@dynatrace/barista-components/tile';
import { DtTimelineChartModule } from '@dynatrace/barista-components/timeline-chart';
import { DtToggleButtonGroupModule } from '@dynatrace/barista-components/toggle-button-group';
import { DtTopBarNavigationModule } from '@dynatrace/barista-components/top-bar-navigation';
import { DtTreeTableModule } from '@dynatrace/barista-components/tree-table';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    HttpClientModule,
    DtIconModule.forRoot({ svgIconLocation: '/assets/icons/{{name}}.svg' }),
  ],
  exports: [
    DtAlertModule,
    DtAutocompleteModule,
    DtButtonModule,
    DtCheckboxModule,
    DtTableModule,
    DtLoadingDistractorModule,
    DtTileModule,
    DtTagModule,
    DtCardModule,
    DtContextDialogModule,
    DtDrawerModule,
    DtCopyToClipboardModule,
    DtButtonGroupModule,
    DtRadioModule,
    DtShowMoreModule,
    DtProgressCircleModule,
    DtPaginationModule,
    DtSwitchModule,
    DtProgressBarModule,
    DtSelectModule,
    DtInputModule,
    DtOverlayModule,
    DtTreeTableModule,
    DtToggleButtonGroupModule,
    DtInfoGroupModule,
    DtHighlightModule,
    DtConsumptionModule,
    DtFilterFieldModule,
    DtMenuModule,
    DtEmptyStateModule,
    DtTimelineChartModule,
    DtExpandableTextModule,
    DtEventChartModule,
    DtTopBarNavigationModule,
    DtStepperModule,
    DtContainerBreakpointObserverModule,
  ],
})
export class BaristaModule {}
