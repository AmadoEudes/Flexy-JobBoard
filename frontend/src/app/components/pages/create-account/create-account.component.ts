import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  generoSeleccionado: string;

  constructor() { }

  ngOnInit(): void {
    console.log("iniciando componente");
  }
  
  onGeneroChange() {

    console.log('logrado');
    
}
  continuarBtn() {
    console.log(this.generoSeleccionado); 
  }

}
