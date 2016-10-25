import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MdSelect} from './select';
import {MdOption} from './option';
import {MdRippleModule} from "../core/ripple/ripple";
export * from './select';
import {OverlayModule, OVERLAY_PROVIDERS} from '../core';

@NgModule({
    imports: [CommonModule, FormsModule, OverlayModule, MdRippleModule],
    exports: [MdSelect, MdOption],
    declarations: [MdSelect, MdOption],
})
export class MdSelectModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: MdSelectModule,
            providers: [OVERLAY_PROVIDERS]
        };
    }
}
