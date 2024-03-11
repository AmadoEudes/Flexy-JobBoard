import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { RegisterService } from 'src/app/services/register.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { validarQueSeanIguales } from './validador';
@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  form:  FormGroup;

  constructor(private formBuilder:FormBuilder, private router:Router, private usuarioService: UsuarioService) {}
  data: Usuario;
  registerForm = new FormGroup({
    nombres: new FormControl('', [Validators.required]),
    apellidos: new FormControl('', [Validators.required]),
    correo_electronico: new FormControl('', [Validators.required, Validators.email]),
    fecha_nacimiento: new FormControl('', [Validators.required]),
    genero: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required, Validators.pattern(/^\d{9}$/)]),
    contrasenia: new FormControl(''),
    identificacion: new FormControl('', [Validators.required, Validators.pattern(/^\d{8}$/)]),
    departamento: new FormControl('', [Validators.required]),
    descripcion: new FormControl(''),
    metodo_pago: new FormControl(''),
    estado: new FormControl('1')
  });
  
  ngOnInit(): void {
    this.initForm();
    console.log("iniciando componente");
  }
  initForm() {
    this.form = this.formBuilder.group({
      'password':  ['', Validators.required],
      'confirmarPassword': ['', Validators.required]
    }, {
      validators: validarQueSeanIguales
    });
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
      return this.registerForm.controls.correo_electronico;  
  } 
  get contrasena() {
    return this.registerForm.controls.contrasenia;
  }
  get password() {
    return this.form.controls.contrasenia;
  }
  get fechaNacimiento() {
    return this.registerForm.controls.fecha_nacimiento;
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
  get metodo_pago() {
    return this.registerForm.controls.metodo_pago;
  }
  get estado() {
    return this.registerForm.controls.estado;
  }
  
  addUsuario() {
    if(this.registerForm.valid){
      if(this.form.valid){

        this.data = { ...this.registerForm.value} as Usuario;
        this.data.contrasenia = this.form.get('password').value;

        console.log(this.data);
        
        this.usuarioService.addUsuario(this.data).subscribe(data => {
          this.router.navigate(['/']);
        });
      } else {
        console.log("Contraseñas no coinciden");
      }


    } else {
      this.registerForm.markAllAsTouched();
      console.log("Formulario no válido");
    }
  }
  print(){
    console.log("CAMBIANDO");
  }
  validateFormat(event) {
    let key;
    if (event.type === 'paste') {
      key = event.clipboardData.getData('text/plain');
    } else {
      key = event.keyCode;
      key = String.fromCharCode(key);
    }
    const regex = /[0-9]|\./;
    if (!regex.test(key)) {
    event.returnValue = false;
      if (event.preventDefault) {
      event.preventDefault();
      }
    }
  }

  checarSiSonIguales(): boolean {
    return this.form.hasError('noSonIguales') &&
      this.form.get('password').dirty &&
      this.form.get('confirmarPassword').dirty;
  }
}
