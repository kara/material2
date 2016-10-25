import {Component, ViewEncapsulation} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'select-demo',
    templateUrl: 'select-demo.html',
    styleUrls: ['select-demo.css'],
    encapsulation: ViewEncapsulation.None
})
export class SelectDemo {
  food: string = null;
  isDisabled = false;
  items = [
    {value: 'steak', text: 'Steak'},
    {value: 'pizza', text: 'Pizza'},
    {value: 'tacos', text: 'Tacos'},
  ]

  states = [
    'AZ',
    'AK',
    'AL',
    'CA',
    'CO',
    'FL',
    'GA',
    'MA',
    'MI',
    'MS',
    'NC',
    'NM',
    'NY',
    'SC',
    'SD',
    'TN',
    'WY'
  ]
}
