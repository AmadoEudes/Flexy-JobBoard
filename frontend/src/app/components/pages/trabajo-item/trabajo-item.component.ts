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
      'Eventos y entretenimiento': 'assets/img/home-1/jobs/evento_entretenimiento.png',
      'Cuidado del Hogar' : 'assets/img/home-1/jobs/cuidado_hogar.png',
      'Reparaciones y Mantenimientos' : 'assets/img/home-1/jobs/reparaciones_mantenimiento.png',
      'Educación y Tutoría' : 'assets/img/home-1/jobs/educacion_tutoria.png',
      'Cuidado y Atención' :'assets/img/home-1/jobs/cuidado_atencion.png',
      'Entrenamiento y fitness' : 'assets/img/home-1/jobs/entrenamiento_fitness.png',
      'Transporte' : 'assets/img/home-1/jobs/transporte.png',
      'Soporte Administrativo' : 'assets/img/home-1/jobs/soporte_administrativo.png',
      'Limpieza' : 'assets/img/home-1/jobs/limpieza.png',
      'Jardinería' : 'assets/img/home-1/jobs/jardineria.png',
      // Agrega más categorías según sea necesario
    };
  
    // Devuelve la URL de la imagen correspondiente a la categoría
    return imageUrls[categoria] || 'assets/img/home-1/jobs/default.png'; // Default image URL si la categoría no está mapeada
  }
}
