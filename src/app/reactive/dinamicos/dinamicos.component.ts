import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styleUrls: ['./dinamicos.component.css']
})
export class DinamicosComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    favoritos: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required]
    ], Validators.required)
  });

  nuevoFavorito: FormControl = this.fb.control('', Validators.required);

  get favoritosArr() {
    return this.miFormulario.get('favoritos') as FormArray
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  campoNoEsValido(campo: string){
    return this.miFormulario.controls[campo].invalid && this.miFormulario.controls[campo].touched
  }

  agregarFavorito(){
    if(this.nuevoFavorito.invalid) {return;}
    this.favoritosArr.push(this.fb.control(this.nuevoFavorito.value, Validators.required));
    this.nuevoFavorito.reset()
  }

  eliminarFavorito(index: number) {
    //this.favoritosArr.controls.splice(index, 1);
    this.favoritosArr.removeAt(index);
  }

  guardar() {
    if(this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched();
      return;
    }
    console.log(this.miFormulario.value);
  }

}
