import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {Component} from '@angular/core';
import {MdSelectModule} from './index';
import {OverlayContainer} from '../core/overlay/overlay-container';
import {By} from '@angular/platform-browser';
import {MdOption} from "./option";

describe('MdSelect', () => {
  let overlayContainerElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdSelectModule.forRoot()],
      declarations: [BasicSelect],
      providers: [
        {provide: OverlayContainer, useFactory: () => {
          overlayContainerElement = document.createElement('div');
          return {getContainerElement: () => overlayContainerElement};
        }}
      ]
    });

    TestBed.compileComponents();
  }));

  describe('overlay', () => {

    it('should open the select when trigger is clicked', () => {
      const fixture = TestBed.createComponent(BasicSelect);
      fixture.detectChanges();

      const trigger = fixture.debugElement.query(By.css('.md-select-trigger'));
      trigger.nativeElement.click();

      expect(overlayContainerElement.textContent).toContain('Steak');
      expect(overlayContainerElement.textContent).toContain('Pizza');
      expect(overlayContainerElement.textContent).toContain('Tacos');
    });

    // it('should close the select when option is clicked', () => {
    //   const trigger = fixture.debugElement.query(By.css('.md-select-trigger'));
    //   trigger.nativeElement.click();
    //
    //   const option = fixture.debugElement.query(By.directive(MdOption));
    //   option.nativeElement.click();
    //   fixture.detectChanges();
    //
    //   expect(overlayContainerElement.textContent).toBe('');
    // });
    //
    // it('should close the select when a click occurs outside the panel', () => {
    //   const fixture = TestBed.createComponent(BasicSelect);
    //   fixture.detectChanges();
    //   const trigger = fixture.debugElement.query(By.css('.md-select-trigger'));
    //   trigger.nativeElement.click();
    //
    //   const backdrop = <HTMLElement>overlayContainerElement.querySelector('.md-overlay-backdrop');
    //   backdrop.click();
    //   fixture.detectChanges();
    //
    //   expect(overlayContainerElement.textContent).toBe('');
    // });

  });

  describe('selection', () => {

    describe('no selection', () => {

      it('should show only the placeholder', () => {
        const fixture = TestBed.createComponent(BasicSelect);
        fixture.detectChanges();

        const trigger = fixture.debugElement.query(By.css('.md-select-trigger'));
        expect(trigger.nativeElement.textContent.trim()).toEqual('Food');
      });

      fit('should focus the first item on open', () => {
        const fixture = TestBed.createComponent(BasicSelect);
        fixture.detectChanges();

        const trigger = fixture.debugElement.query(By.css('.md-select-trigger'));
        trigger.nativeElement.click();

        fixture.detectChanges();

        console.log(document.activeElement.nodeName)
        expect(document.activeElement.getAttribute('value')).toEqual('steak');
      });

    });

    it('should select an option when clicked', () => {

    });

    it('should unselect other options when a new selection is made', () => {

    });

    it('should display the placeholder and the selected view value', () => {

    });

    it('should focus the selected item on open', () => {

    });

    it('should not select disabled options', () => {

    });

  });

  describe('form integration', () => {

    it('should set the value of the select externally (model -> view)', () => {

    });

    it('should update the model when the select changes from user input (view -> model)', () => {

    });

    it('should use the option text content if no value property is present', () => {

    });

    it('should be dirty if the user makes a selection', () => {

    });

    it('should be touched on user interaction', () => {

    });

    it('should show asterisk if the field is required', () => {

    });

    it('should not open when select is disabled on the template', () => {

    });

    it('should not open when select is disabled programmatically', () => {

    });

  });

  describe('aria labels', () => {

    it('should set the select role to listbox', () => {

    });

    it('should set each option role to option', () => {

    });

    it('should set aria-selected on each option', () => {

    });

    it('should set aria-invalid on select if invalid', () => {

    });

    it('should set aria-required on select if required', () => {

    });

    it('should set aria-disabled on select if disabled', () => {

    });

    it('should set aria-disabled on the option if disabled', () => {

    });

  });


});

@Component({
  selector: 'test-select',
  template: `
    <md-select placeholder="Food">
      <md-option value="steak">Steak</md-option>
      <md-option value="pizza">Pizza</md-option>
      <md-option value="tacos">Tacos</md-option>
    </md-select>
  `
})
class BasicSelect {}
