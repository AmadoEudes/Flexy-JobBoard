import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UsuarioModel } from 'src/app/model/usuario-model';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

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
