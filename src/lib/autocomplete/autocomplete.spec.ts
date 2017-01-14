import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {Component, ViewChild} from '@angular/core';
import {By} from '@angular/platform-browser';
import {MdAutocompleteModule, MdAutocompleteTrigger} from './index';
import {OverlayContainer} from '../core/overlay/overlay-container';
import {MdInputModule} from '../input/index';

describe('MdAutocomplete', () => {
  let overlayContainerElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdAutocompleteModule.forRoot(), MdInputModule.forRoot()],
      declarations: [SimpleAutocomplete],
      providers: [
        {provide: OverlayContainer, useFactory: () => {
          overlayContainerElement = document.createElement('div');
          document.body.appendChild(overlayContainerElement);

          // remove body padding to keep consistent cross-browser
          document.body.style.padding = '0';
          document.body.style.margin = '0';

          return {getContainerElement: () => overlayContainerElement};
        }},
      ]
    });

    TestBed.compileComponents();
  }));

  describe('panel toggling', () => {
    let fixture: ComponentFixture<SimpleAutocomplete>;
    let trigger: HTMLElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleAutocomplete);
      fixture.detectChanges();

      trigger = fixture.debugElement.query(By.css('input')).nativeElement;
    });

    it('should open the panel when the input is focused', () => {
      expect(fixture.componentInstance.trigger.panelOpen).toBe(false);
      dispatchEvent('focus', trigger);
      fixture.detectChanges();

      expect(fixture.componentInstance.trigger.panelOpen)
          .toBe(true, `Expected panel state to read open when input is focused.`);
      expect(overlayContainerElement.textContent)
          .toContain('Alabama', `Expected panel to display when input is focused.`);
      expect(overlayContainerElement.textContent)
          .toContain('California', `Expected panel to display when input is focused.`);
    });

    it('should open the panel programmatically', () => {
      expect(fixture.componentInstance.trigger.panelOpen).toBe(false);
      fixture.componentInstance.trigger.openPanel();
      fixture.detectChanges();

      expect(fixture.componentInstance.trigger.panelOpen)
          .toBe(true, `Expected panel state to read open when opened programmatically.`);
      expect(overlayContainerElement.textContent)
          .toContain('Alabama', `Expected panel to display when opened programmatically.`);
      expect(overlayContainerElement.textContent)
          .toContain('California', `Expected panel to display when opened programmatically.`);
    });

    it('should close the panel when a click occurs outside it', async(() => {
      dispatchEvent('focus', trigger);
      fixture.detectChanges();

      const backdrop =
          overlayContainerElement.querySelector('.cdk-overlay-backdrop') as HTMLElement;
      backdrop.click();
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(fixture.componentInstance.trigger.panelOpen)
            .toBe(false, `Expected clicking outside the panel to set its state to closed.`);
        expect(overlayContainerElement.textContent)
            .toEqual('', `Expected clicking outside the panel to close the panel.`);
      });
    }));

    it('should close the panel when an option is clicked', async(() => {
      dispatchEvent('focus', trigger);
      fixture.detectChanges();

      const option = overlayContainerElement.querySelector('md-option') as HTMLElement;
      option.click();
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(fixture.componentInstance.trigger.panelOpen)
            .toBe(false, `Expected clicking an option to set the panel state to closed.`);
        expect(overlayContainerElement.textContent)
            .toEqual('', `Expected clicking an option to close the panel.`);
      });
    }));

    it('should close the panel when a newly created option is clicked', async(() => {
      fixture.componentInstance.states.unshift({code: 'TEST', name: 'test'});
      fixture.detectChanges();

      dispatchEvent('focus', trigger);
      fixture.detectChanges();

      const option = overlayContainerElement.querySelector('md-option') as HTMLElement;
      option.click();
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(fixture.componentInstance.trigger.panelOpen)
            .toBe(false, `Expected clicking a new option to set the panel state to closed.`);
        expect(overlayContainerElement.textContent)
            .toEqual('', `Expected clicking a new option to close the panel.`);
      });
    }));

    it('should close the panel programmatically', async(() => {
      fixture.componentInstance.trigger.openPanel();
      fixture.detectChanges();

      fixture.componentInstance.trigger.closePanel();
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(fixture.componentInstance.trigger.panelOpen)
            .toBe(false, `Expected closing programmatically to set the panel state to closed.`);
        expect(overlayContainerElement.textContent)
            .toEqual('', `Expected closing programmatically to close the panel.`);
      });
    }));

  });

  describe('aria', () => {

    it('should set role of input to combobox', () => {
      expect(input.getAttribute('role'))
          .toEqual('combobox', 'Expected role of input to be combobox.');
    });

    it('should set role of autocomplete panel to listbox', () => {
      const panel = fixture.debugElement.query(By.css('.md-autocomplete-panel')).nativeElement;

      expect(panel.getAttribute('role'))
          .toEqual('listbox', 'Expected role of the panel to be listbox.');
    });

    it('should set aria-autocomplete to list', () => {
      expect(input.getAttribute('aria-autocomplete'))
          .toEqual('list', 'Expected aria-autocomplete attribute to equal list.');
    });

    it('should set aria-multiline to false', () => {
      expect(input.getAttribute('aria-multiline'))
          .toEqual('false', 'Expected aria-multiline attribute to equal false.');
    });

    it('should set aria-activedescendant based on the active option', () => {
      fixture.componentInstance.trigger.openPanel();
      fixture.detectChanges();

      expect(input.hasAttribute('aria-activedescendant'))
          .toBe(false, 'Expected aria-activedescendant to be absent if no active item.');

      const DOWN_ARROW_EVENT = new FakeKeyboardEvent(DOWN_ARROW) as KeyboardEvent;
      fixture.componentInstance.trigger._handleKeydown(DOWN_ARROW_EVENT);
      fixture.detectChanges();

      expect(input.getAttribute('aria-activedescendant'))
          .toEqual(fixture.componentInstance.options.first.id,
              'Expected aria-activedescendant to match the active item after 1 down arrow.');

      fixture.componentInstance.trigger._handleKeydown(DOWN_ARROW_EVENT);
      fixture.detectChanges();

      expect(input.getAttribute('aria-activedescendant'))
          .toEqual(fixture.componentInstance.options.toArray()[1].id,
              'Expected aria-activedescendant to match the active item after 2 down arrows.');
    });

    it('should set aria-expanded based on whether the panel is open', async(() => {
      expect(input.getAttribute('aria-expanded'))
          .toBe('false', 'Expected aria-expanded to be false while panel is closed.');

      fixture.componentInstance.trigger.openPanel();
      fixture.detectChanges();

      expect(input.getAttribute('aria-expanded'))
          .toBe('true', 'Expected aria-expanded to be true while panel is open.');

      fixture.componentInstance.trigger.closePanel();
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(input.getAttribute('aria-expanded'))
            .toBe('false', 'Expected aria-expanded to be false when panel closes again.');
      });
    }));

    it('should set aria-owns based on the attached autocomplete', () => {
      fixture.componentInstance.trigger.openPanel();
      fixture.detectChanges();

      const panel = fixture.debugElement.query(By.css('.md-autocomplete-panel')).nativeElement;

      expect(input.getAttribute('aria-owns'))
          .toEqual(panel.getAttribute('id'), 'Expected aria-owns to match attached autocomplete.');
    });

  });

});

@Component({
  template: `
    <md-input-container>
      <input mdInput placeholder="State" [mdAutocomplete]="auto">
    </md-input-container>
  
    <md-autocomplete #auto="mdAutocomplete">
      <md-option *ngFor="let state of states" [value]="state.code"> {{ state.name }} </md-option>
    </md-autocomplete>
  `
})
class SimpleAutocomplete {
  @ViewChild(MdAutocompleteTrigger) trigger: MdAutocompleteTrigger;

  states = [
    {code: 'AL', name: 'Alabama'},
    {code: 'CA', name: 'California'},
    {code: 'FL', name: 'Florida'},
    {code: 'KS', name: 'Kansas'},
    {code: 'MA', name: 'Massachusetts'},
    {code: 'NY', name: 'New York'},
    {code: 'OR', name: 'Oregon'},
    {code: 'PA', name: 'Pennsylvania'},
    {code: 'TN', name: 'Tennessee'},
    {code: 'VA', name: 'Virginia'},
    {code: 'WY', name: 'Wyoming'},
  ];
}


/**
 * TODO: Move this to core testing utility until Angular has event faking
 * support.
 *
 * Dispatches an event from an element.
 * @param eventName Name of the event
 * @param element The element from which the event will be dispatched.
 */
function dispatchEvent(eventName: string, element: HTMLElement): void {
  let event  = document.createEvent('Event');
  event.initEvent(eventName, true, true);
  element.dispatchEvent(event);
}


