import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ValidatorService } from 'src/app/shared/validators/validator.service';
// import { emailPattern, nombreApellidoPattern, noPuedeSerStrider } from "../../../shared/validators/validaciones";
import { EmailValidatorService } from '../../../shared/validators/email-validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern(this.validatorService.nombreApellidoPattern)]],
    email: ['', [Validators.required, Validators.pattern(this.validatorService.emailPattern)], [this.emailValidator]],
    username: ['', [Validators.required, this.validatorService.noPuedeSerStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmar: ['', [Validators.required]]
  }, {
    validators: [this.validatorService.camposIguales('password','confirmar')]
  });

  get emailErrorMsg(): string {
    const errors = this.miFormulario.get('email')?.errors;
    if(!errors) return '';
    if(errors['required']) {
      return 'El email es obligatorio'
    }
    if(errors['pattern']) {
      return 'El email no tiene el formato correcto'
    }
    if(errors['emailYaExiste']) {
      return 'El email ya existe en la base de datos'
    }
    return '';
  }

  constructor(private fb: FormBuilder, private validatorService: ValidatorService, private emailValidator: EmailValidatorService) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: '',
      email: '',
      username: '',
      password: '',
      confirmar: ''
    })
  }

  campoNoValido(campo: string): boolean {
    return this.miFormulario.controls[campo]?.invalid && this.miFormulario.controls[campo]?.touched
  }



  formularioNoValido(): boolean {
    return this.miFormulario.invalid || this.miFormulario.pending;
  }

  submitFormulario() {
    console.log(this.miFormulario.value);
    this.miFormulario.markAllAsTouched();
  }

}
