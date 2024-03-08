import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  registerForm = this.formBuilder.group({
    nombres: ['', [Validators.required]],
    apellidos: ['', [Validators.required]],
    telefono: ['', [Validators.required]],
    correo: ['', [Validators.required]],
    contrasena: ['', [Validators.required]],
    confirmarcontrasena: ['', [Validators.required]],
    fechaNacimiento: ['', [Validators.required]],
    genero: [''],
    identificacion: ['', [Validators.required]],
    departamento: [''],
  });
  generoSeleccionado: string;
  

  constructor(private formBuilder:FormBuilder, private router:Router, private registerService: RegisterService) { }

  ngOnInit(): void {
    console.log("iniciando componente");
  }
  
  get nombres() {
    return this.registerForm.controls.nombres;
  }
  get apellidos() {
    return this.registerForm.controls.apellidos;
  }
  get telefono() {
    return this.registerForm.controls.telefono;
  }
  get correo() {
      return this.registerForm.controls.correo;  
  } 
  get contrasena() {
    return this.registerForm.controls.contrasena;
  }
  get confirmarcontrasena() {
    return this.registerForm.controls.confirmarcontrasena;
  }
  get fechaNacimiento() {
    return this.registerForm.controls.fechaNacimiento;
  }
  get genero() {
    return this.registerForm.controls.genero;
  }
  get identificacion() {
    return this.registerForm.controls.identificacion;
  }
  get departamento() {
    return this.registerForm.controls.departamento;
  }
  

  register() {
    if(this.registerForm.valid){
      this.registerService.register(this.registerForm.value);
      this.router.navigateByUrl('/');
      this.registerForm.reset();
    } else {
      this.registerForm.markAllAsTouched();
      console.log("Formulario no válido");
    }
  }
}
