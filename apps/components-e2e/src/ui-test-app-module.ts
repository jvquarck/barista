import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { DtButtonModule } from '@dynatrace/angular-components/button';
import { DtButtonGroupModule } from '@dynatrace/angular-components/button-group';
import { DtCheckboxModule } from '@dynatrace/angular-components/checkbox';
import { DtConsumptionModule } from '@dynatrace/angular-components/consumption';
import { DtContextDialogModule } from '@dynatrace/angular-components/context-dialog';
import { DtCopyToClipboardModule } from '@dynatrace/angular-components/copy-to-clipboard';
import { DtDrawerModule } from '@dynatrace/angular-components/drawer';
import { DtExpandablePanelModule } from '@dynatrace/angular-components/expandable-panel';
import { DtExpandableSectionModule } from '@dynatrace/angular-components/expandable-section';
import { DtIconModule } from '@dynatrace/angular-components/icon';
import { DtInputModule } from '@dynatrace/angular-components/input';
import { DtKeyValueListModule } from '@dynatrace/angular-components/key-value-list';
import { DtOverlayModule } from '@dynatrace/angular-components/overlay';
import { DtPaginationModule } from '@dynatrace/angular-components/pagination';
import { DtProgressBarModule } from '@dynatrace/angular-components/progress-bar';
import { DtRadioModule } from '@dynatrace/angular-components/radio';
import { DtSelectModule } from '@dynatrace/angular-components/select';
import { DtSelectionAreaModule } from '@dynatrace/angular-components/selection-area';
import { DtShowMoreModule } from '@dynatrace/angular-components/show-more';
import { DtStepperModule } from '@dynatrace/angular-components/stepper';
import { DtSwitchModule } from '@dynatrace/angular-components/switch';
import { DtTabsModule } from '@dynatrace/angular-components/tabs';
import { DtTileModule } from '@dynatrace/angular-components/tile';
import { DtTopBarNavigationModule } from '@dynatrace/angular-components/top-bar-navigation';

import { DtFilterFieldModule } from '../lib';
import { ButtonGroupUi } from './button-group/button-group-ui';
import { ButtonUI } from './button/button-ui';
import { CheckboxUI } from './checkbox/checkbox-ui';
import { ConsumptionUI } from './consumption/consumption-ui';
import { ContextDialogUI } from './context-dialog/context-dialog-ui';
import { CopyToClipboardUI } from './copy-to-clipboard/copy-to-clipboard-ui';
import { DrawerUI } from './drawer/drawer-ui';
import { ExpandablePanelUi } from './expandable-panel/expandable-panel-ui';
import { ExpandableSectionUi } from './expandable-section/expandable-section-ui';
import { FilterFieldUi } from './filter-field/filter-field-ui';
import { KeyValueListUI } from './key-value-list/key-value-list-ui';
import { OverlayUI } from './overlay/overlay-ui';
import { PaginationUI } from './pagination/pagination-ui';
import { ProgressBarUI } from './progress-bar/progress-bar-ui';
import { RadioUI } from './radio/radio.ui';
import { ShowMoreUI } from './show-more/show-more-ui';
import { SwitchUI } from './switch/switch-ui';
import { TabsUI } from './tabs/tabs-ui';
import { TileUI } from './tile/tile-ui';
import { TopBarNavigationUI } from './top-bar-navigation/top-bar-navigation-ui';
import { UI_TEST_APP_ROUTES } from './ui-test-app/routes';
import { Home, UIApp } from './ui-test-app/ui-test-app';

/**
 * NgModule that contains all lib modules that are required to serve the ui-test-app.
 */
@NgModule({
  exports: [
    DtButtonGroupModule,
    DtButtonModule,
    DtCheckboxModule,
    DtConsumptionModule,
    DtContextDialogModule,
    DtCopyToClipboardModule,
    DtDrawerModule,
    DtExpandablePanelModule,
    DtExpandableSectionModule,
    DtFilterFieldModule,
    DtInputModule,
    DtKeyValueListModule,
    DtOverlayModule,
    DtOverlayModule,
    DtPaginationModule,
    DtProgressBarModule,
    DtRadioModule,
    // tslint:disable-next-line: deprecation
    DtSelectionAreaModule,
    DtSelectModule,
    DtSelectModule,
    DtShowMoreModule,
    DtStepperModule,
    DtSwitchModule,
    DtTabsModule,
    DtTileModule,
    DtTopBarNavigationModule,
  ],
})
export class DynatraceAngularCompModule {}

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(UI_TEST_APP_ROUTES),
    DynatraceAngularCompModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DtIconModule.forRoot({ svgIconLocation: '/assets/icons/{{name}}.svg' }),
  ],
  declarations: [
    ButtonGroupUi,
    ButtonUI,
    CheckboxUI,
    ConsumptionUI,
    ContextDialogUI,
    CopyToClipboardUI,
    DrawerUI,
    ExpandablePanelUi,
    ExpandableSectionUi,
    FilterFieldUi,
    Home,
    KeyValueListUI,
    OverlayUI,
    OverlayUI,
    PaginationUI,
    ProgressBarUI,
    RadioUI,
    ShowMoreUI,
    SwitchUI,
    TabsUI,
    TileUI,
    UIApp,
    TopBarNavigationUI,
  ],
  entryComponents: [UIApp],
  bootstrap: [UIApp],
})
export class UiTestAppModule {}
