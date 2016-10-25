import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    Renderer
} from '@angular/core';


@Component({
  moduleId: module.id,
  selector: 'md-option',
  templateUrl: 'option.html',
  host: {
    'role': 'option',
    '(click)': 'select(true)',
    '[class.md-selected]': 'selected',
    '[attr.aria-selected]': 'selected.toString()',
    '[attr.aria-disabled]': 'disabled.toString()',
    '[attr.tabindex]': '_tabIndex',
  }
})
export class MdOption {
  private _selected = false;
  private _disabled = false;

  // TODO: internal
  _tabIndex = '0';

  constructor(public _element: ElementRef, private _renderer: Renderer) {}

  @Input('value') _value: any;
  @Input()
  get disabled() { return this._disabled; }

  set disabled(value: any) {
    this._disabled = value === '' || (!!value && value !== 'false');
    this._tabIndex = this._disabled ? '-1' : '0';
  }

  @Output() onSelect = new EventEmitter();

  get value(): any { return this._value !== undefined ? this._value : this.viewValue; }

  get selected(): boolean { return this._selected; }

  get viewValue(): string {
    return this._element.nativeElement.textContent.trim();
  }

  select(userChange: boolean = false): void {
    if (!this.disabled) {
      this._selected = true;
      this.onSelect.emit(userChange);
    }
  }

  focus(): void {
    this._renderer.invokeElementMethod(this._element.nativeElement, 'focus');
  }

  // TODO: internal
  _unselect(): void {
    this._selected = false;
  }
}
