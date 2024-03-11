import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Job } from 'src/app/models/job.model';
import { JobService } from 'src/app/services/job.service';
import {Map, marker, tileLayer} from 'leaflet';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {
  ruta: string | undefined;
  job: Job | undefined;
  usuario: Usuario | undefined;
  usuario_id: string | undefined;
  uLatitud: number | undefined;
  uLongitud: number | undefined;

  constructor(private route: ActivatedRoute, private jobService: JobService, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.ruta = this.route.snapshot.params['id'];
    const [idUsuario, idAnuncio] = this.ruta.split('_');
    //console.log(this.ruta, idUsuario, idAnuncio);
    
    this.jobService.getAnuncioById(idAnuncio).subscribe({
      next: (data: Job) => {
        this.job = data;
        this.uLatitud = parseFloat(this.job.u_latitud);
        this.uLongitud = parseFloat(this.job.u_longitud);
        this.initMap(this.uLatitud, this.uLongitud);
      },
      error: (error: any) => {
        console.error('Error al cargar el anuncio.', error);
      },
      complete: () => {
        console.log('El anuncio cargó correctamente.');
      }
    });
    this.usuarioService.getUsuarioById(idUsuario).subscribe({
      next: (data: Usuario) => {
        this.usuario = data;
      },
      error: (error: any) => {
        console.error('Error al cargar el usuario.', error);
      },
      complete: () => {
        console.log('El usuario cargó correctamente.');
      }
    });

  }

  private initMap(latitud: number, longitud: number): void {
    const map = new Map('map').setView([-13.16042,-74.22575], 13);
    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    marker([latitud, longitud]).addTo(map);
    setTimeout(() => {
      map?.flyTo([latitud, longitud], 19, { duration: 5 });
    }, 1500); 


  }
  

}
