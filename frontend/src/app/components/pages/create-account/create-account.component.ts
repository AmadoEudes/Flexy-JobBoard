import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, NgForm  } from '@angular/forms';
import { UsuarioModel } from 'src/app/model/usuario-model';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  
  listUsuarios: UsuarioModel[] = [];
  formRegistro: FormGroup = new FormGroup({});
  item: UsuarioModel = new UsuarioModel();
  idCapturado: number = 0;
  mostrarDiv: boolean = false;


  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {    
    console.log("iniciando componente");
    this.list();
    this.formRegistro = new FormGroup({
        idUsuario: new FormControl(''),
        nombres: new FormControl(''),
        apellidos: new FormControl(''),
        telefono: new FormControl(''),
        correoElectronico: new FormControl(''),
        contrasenia: new FormControl(''),
        confirmarContrasenia: new FormControl(''),
        fechaNacimiento: new FormControl(''),
        genero: new FormControl(''),
        identificacion: new FormControl(''),
        departamento: new FormControl(''),
        descripcion: new FormControl(''),        
        metodoPago: new FormControl('Efectivo'),
        estado: new FormControl('1')
    });
  }

  list(){
    this.usuarioService.getUsuarios().subscribe(resp=>{
      if(resp){
        this.listUsuarios = resp;
      }
    });
  } 

  save(){
    try {
      this.formRegistro.controls['estado'].setValue('1');
      this.formRegistro.controls['metodoPago'].setValue('Efectivo');
      this.formRegistro.controls['descripcion'].setValue('peligroso kuchao');
        
      this.usuarioService.saveUsuario(this.formRegistro.value).toPromise();
    
      this.formRegistro.reset();
    } catch (error) {
      console.error('Error al guardar datos:', error);
        // Mostrar mensaje de error al usuario
    }
  }
  
  update(){
    this.usuarioService.saveUsuario(this.formRegistro.value).subscribe(resp=>{
      if(resp){        
        
        this.formRegistro.reset;
      }
    });
  }
  
  
  delete(usuario: UsuarioModel) {
    this.item = usuario
  
    this.usuarioService.deleteUsuario(this.item.idUsuario).subscribe(resp => {
        
    });
  
  }

  capturarId(usuario: UsuarioModel): void {
    this.item = usuario
    this.idCapturado = this.item.idUsuario;
    console.log('Id de usuario capturado:', this.idCapturado);
    
  }
  
  /*
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
  }*/

  
  


  /*
  newUsuario(){
    this.isUpdate;
    this.formUsuario.reset; 
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
  */
};
