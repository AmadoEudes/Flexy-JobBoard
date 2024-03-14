import { Component, Input, OnInit } from '@angular/core';
import { Job } from 'src/app/models/job.model';

@Component({
  selector: 'app-trabajo-item',
  templateUrl: './trabajo-item.component.html',
  styleUrls: ['./trabajo-item.component.css']
})
export class TrabajoItemComponent implements OnInit {
  @Input() job: Job | undefined;
  constructor() { }

  ngOnInit() {
      console.log(this.job);
  }

  getImageUrl(categoria: string): string {
    // Define un diccionario que mapee las categorías a las URL de las imágenes
    const imageUrls = {
      'Trabajo temporal': 'assets/img/home-1/jobs/trabajo_temporal.png',
      'Eventos y entretenimiento': 'assets/img/home-1/jobs/evento_entretenimiento.png',
      // Agrega más categorías según sea necesario
    };
  
    // Devuelve la URL de la imagen correspondiente a la categoría
    return imageUrls[categoria] || 'assets/img/home-1/jobs/default.png'; // Default image URL si la categoría no está mapeada
  }
}
