import { Injectable } from '@angular/core';
import { FormControl, ValidationErrors, FormGroup, AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  public nombreApellidoPattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  constructor() { }

  noPuedeSerStrider(control: FormControl): ValidationErrors | null {
    const valor = control.value?.trim().toLowerCase();
    if(valor === 'strider') {
        return {
            noStrider: true
        }
    }
    return null;
  }

  camposIguales(campo1: string, campo2: string) {
    return (form: AbstractControl): ValidationErrors | null => {
      const valor1 = form.get(campo1)?.value;
      const valor2 = form.get(campo2)?.value;

      if(valor1 !== valor2) {
        form.get(campo2)?.setErrors({noIguales: true});
        return { noIguales: true }
      }

      if (form.get(campo2)?.hasError('noIguales')) {
        delete form.get(campo2)?.errors?.['noIguales'];
        form.get(campo2)?.updateValueAndValidity();
      }
      return null;
    }
  }
}
