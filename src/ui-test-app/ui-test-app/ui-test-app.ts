import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'dt-home',
  template: `<p>ui-test tests!</p>`,
})
export class Home {}

@Component({
  selector: 'dt-ui-test-app',
  templateUrl: 'ui-test-app.html',
})
export class UIApp {
  navItems = [
    {name: 'Start', route: '/'},
    {name: 'Dummy', route: '/dummy'},
  ];
}