import {
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  QueryList,
  Renderer,
  ViewEncapsulation,
  Self,
  Optional
} from '@angular/core';
import {ControlValueAccessor, NgControl} from '@angular/forms';
import {MdOption} from './option';
import {MdSelectAnimations} from "./select-animations";

@Component({
  moduleId: module.id,
  selector: 'md-select',
  templateUrl: 'select.html',
  styleUrls: ['select.css'],
  encapsulation: ViewEncapsulation.None,
  exportAs: 'mdSelect',
  host: {
    'role': 'listbox',
    '(blur)': '_onTouched()',
    '[attr.tabindex]': '_tabIndex',
    '[attr.aria-disabled]': 'disabled.toString()',
    '[attr.aria-required]': 'required.toString()',
    '[attr.aria-invalid]': '_control?.invalid?.toString()',
    '[attr.aria-label]': 'placeholder'
  },
  animations: [
    MdSelectAnimations.transformLabel(),
    MdSelectAnimations.transformPanel(),
    MdSelectAnimations.fadeInOptions()
  ],
})
export class MdSelect implements AfterContentInit, ControlValueAccessor {
  private _panelOpen: boolean;
  private _selected: MdOption;
  private _onChange: (value: any) => void;
  private _onTouched = () => {};
  private _disabled = false;
  private _required = false;

  // TODO: internal
  _tabIndex = '0';

  @ContentChildren(MdOption) options: QueryList<MdOption>;

  constructor(private _element: ElementRef, private _renderer: Renderer,
              @Self() @Optional() public _control: NgControl) {

    if (this._control) {
      this._control.valueAccessor = this;
    }
  }

  ngAfterContentInit() {
    this.options.forEach((option) => {
      option.onSelect.subscribe((userChange: boolean) => {
        this._selected = option;
        this._updateSelection();

        // only call change callback if change originated from user
        if (userChange && this._onChange) {
          this._onChange(option.value);
        }

        this.close();
      });
    });
  }

  @Input() placeholder: string;

  @Input()
  get disabled() { return this._disabled; }

  set disabled(value: any) {
    this._disabled = coerceToBoolean(value);
    this._tabIndex = this._disabled ? '-1' : '0';
  }

  @Input()
  get required() { return this._required; }

  set required(value: any) {
    this._required = coerceToBoolean(value);
  }

  get selected() { return this._selected; }

  get panelOpen() { return this._panelOpen; }

  toggleIfEnabled(event: Event) {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      this.toggle();
    }
  }

  toggle() {
    this._panelOpen ? this.close() : this.open();
  }

  open() {
    if (this.disabled) return;
    this._panelOpen = true;
    this._focusCorrectOption();
  }

  close() {
    this._panelOpen = false;
    this._focusHost();
  }

  writeValue(value: any) {
    if (!this.options) return;
    this.options.forEach((option) => {
      if (option.value === value) {
        option.select();
      }
    });
  }

  registerOnChange(fn: (value: any) => void) {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => {}) {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  get labelState() {
    return this.selected || this.panelOpen ? 'floating' : 'normal';
  }

  _getTriggerWidth(): number {
    return this._element.nativeElement.querySelector('.md-select-trigger')
                                      .getBoundingClientRect().width;
  }

  private _updateSelection(): void {
    this.options.forEach((option: MdOption) => {
      if (option !== this._selected) {
        option._unselect();
      }
    });
  }

  private _focusHost() {
    this._renderer.invokeElementMethod(this._element.nativeElement, 'focus');
  }

  private _focusCorrectOption() {
    this._selected ? this._selected.focus() : this.options.first.focus();
  }

}

export function coerceToBoolean(value: any): boolean {
  return value === '' || (!!value && value !== 'false');
}