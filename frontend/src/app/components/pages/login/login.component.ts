import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { LoginService } from 'src/app/services/login.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = this.formBuilder.group({ //es la estructura del formulario
    correo: ['', [Validators.required]],
    contrasena: ['', [Validators.required]],
  });  
  constructor(private location: Location, private formBuilder:FormBuilder, private router:Router, private loginService: LoginService) { }

  ngOnInit(): void {
  }
  get correo() { //Obtener el valor del input
    return this.loginForm.controls.correo;  
  } 
  get contrasena() { //Obtener el valor del input
    return this.loginForm.controls.contrasena;
  }
  
  forgotPassword() {
    console.log("Olvidé mi contraseña");
  }

  login() { //La función que se activa al darle al boton de iniciar sesión
    if(this.loginForm.valid){
      this.loginService.login(this.loginForm.value.correo, this.loginForm.value.contrasena).pipe(first()).subscribe(
      data => {
        console.log(data);
        this.recargarPagina();
      });
    } else {
      this.loginForm.markAllAsTouched();
      console.log("Formulario no válido");
    }
  }

  recargarPagina() {
    this.location.replaceState(this.location.path());
    window.location.reload();
  }
}
