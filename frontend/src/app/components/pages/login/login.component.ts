import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UsuarioModel } from 'src/app/model/usuario-model';
import { UsuarioService } from 'src/app/service/usuario.service';
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

  listUsuarios: UsuarioModel[] = [];
  formUsuario: FormGroup = new FormGroup({});
  isUpdate: boolean = false;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.formUsuario = new FormGroup({
      idUsuario: new FormControl(''),
      nombres: new FormControl(''),
      apellidos: new FormControl(''),
      genero: new FormControl(''),
      edad: new FormControl(''),
      telefono: new FormControl(''),
      correoElectronico: new FormControl(''),
      contrasena: new FormControl('')
    })
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
  list(){
    this.usuarioService.getUsuarios().subscribe(resp=>{
      if(resp){
        this.listUsuarios = resp;
      }
    });
  }
  newUsuario(){
    this.isUpdate;
    this.formUsuario.reset; 
  }

  save(){
    this.usuarioService.saveUsuario(this.formUsuario.value).subscribe(resp=>{
      if(resp){
        this.list();
        this.formUsuario.reset();
      }
    });
  }

  update(){
    this.usuarioService.updateUsuario(this.formUsuario.value).subscribe(resp=>{
      if(resp){
        this.list();
        this.formUsuario.reset();
      }
    });
  }

  delete(id: any){
    this.usuarioService.deleteUsuario(id).subscribe(resp=>{
      if(resp){
        this.list();
        this.formUsuario.reset();
      }
    });
  }

  selectItem(item: any){
    this.isUpdate=true;
    this.formUsuario.controls['idUsuario'].setValue(item.idUsuario);
    this.formUsuario.controls['name'].setValue(item.name);
    this.formUsuario.controls['apellidos'].setValue(item.apellidos);
    this.formUsuario.controls['genero'].setValue(item.genero);
    this.formUsuario.controls['edad'].setValue(item.edad);
    this.formUsuario.controls['telefono'].setValue(item.telefono);
    this.formUsuario.controls['correoElectronico'].setValue(item.correoElectronico);
    this.formUsuario.controls['contrasena'].setValue(item.contrasena)
  }

}
