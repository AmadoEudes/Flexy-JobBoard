import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor() { }

  register(credentials:any){
    console.log(credentials);
  }

  /*
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
  */
}
