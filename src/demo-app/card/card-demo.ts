import {Component} from 'angular2/core';
import {MdButton} from '../../components/button/button';
import {MD_CARD_DIRECTIVES} from '../../components/card/card';
import {MD_SIDENAV_DIRECTIVES} from '../../components/sidenav/sidenav';
import {MdProgressCircle, MdSpinner} from '../../components/progress-circle/progress-circle';
import {MdCheckbox} from '../../components/checkbox/checkbox';
import {MdToolbar} from '../../components/toolbar/toolbar';

@Component({
    selector: 'card-demo',
    templateUrl: 'demo-app/card/card-demo.html',
    styleUrls: ['demo-app/card/card-demo.css'],
    directives: [MD_CARD_DIRECTIVES, MdButton, MD_SIDENAV_DIRECTIVES, MdProgressCircle, MdCheckbox, MdToolbar]
})
export class CardDemo {}
