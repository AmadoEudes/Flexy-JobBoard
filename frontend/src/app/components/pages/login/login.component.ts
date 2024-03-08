import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

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
  constructor(private formBuilder:FormBuilder, private router:Router, private loginService: LoginService) { }

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
      this.loginService.login(this.loginForm.value); //Utiliza la función del servicio
      this.router.navigateByUrl('/'); //te lleva a otra ruta
      this.loginForm.reset(); //reinicia el form
    } else {
      this.loginForm.markAllAsTouched();
      console.log("Formulario no válido");
    }
  }
}
