import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';


@Directive({
  selector: '[appValidators]',
  providers: [{ provide: NG_VALIDATORS, useExisting: ValidatorsDirective, multi: true }]

})
export class ValidatorsDirective implements Validator {
  @Input('appValidators') assignee?: string;


  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.assignee && control.value && this.assignee === control.value ? { 'samePersonError': true } : null;
  }

}
