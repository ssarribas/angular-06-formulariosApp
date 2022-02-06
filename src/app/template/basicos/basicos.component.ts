import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styleUrls: ['./basicos.component.css']
})
export class BasicosComponent implements OnInit {

  @ViewChild('miFormulario') miFormulario!: NgForm;

  initForm = {
    producto: 'RTX 4080 ti',
    precio: 0,
    existencias: 10
  }

  constructor() { }

  ngOnInit(): void {
  }

  // guardar(miFormulario:NgForm){
  guardar(){
    console.log(this.miFormulario);
    this.miFormulario.resetForm({
      precio: 0,
      existencias: 0
    });
  }

  nombreValido(): boolean {
    return this.miFormulario?.controls['producto']?.invalid && this.miFormulario?.controls['producto']?.touched;
  }

  precioValido(): boolean {
    // return this.miFormulario?.controls['precio']?.value < 0 && this.miFormulario?.controls['precio']?.touched;
    return this.miFormulario?.controls['precio']?.invalid && this.miFormulario?.controls['precio']?.touched;
  }

  existenciasValidas(): boolean {
    return this.miFormulario?.controls['existencias']?.invalid && this.miFormulario?.controls['existencias']?.touched;
  }

}
