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
  isLoggedIn: boolean = false;
  user_login_id: string = '';
  mostrarPopup: boolean = false;
  tiempoPopup: number = 3000; // Duración en milisegundos (3 segundos en este caso)
  
  constructor(private route: ActivatedRoute, private jobService: JobService, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    // Verificar si hay datos de usuario en el local storage al cargar el componente
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      const userDataParsed = JSON.parse(userData);
      this.isLoggedIn = true;
      this.user_login_id = userDataParsed.user_id; // O cualquier otro dato relevante del usuario
      console.log("Usuario inició sesión: " + this.user_login_id + " = " + this.isLoggedIn);

    }  
    this.ruta = this.route.snapshot.params['id'];
    const [usuario, fechaCreacion, latitud, longitud, titulo] = this.ruta.split('_');
    //console.log(this.ruta, idUsuario, idAnuncio);
    const params = {
      titulo: titulo,
      latitud: latitud,
      longitud: longitud,
      fecha_creacion: fechaCreacion,
      usuario: usuario
    };
    console.log(params);
    this.jobService.anuncioDetalles(params).subscribe(anuncios => {
      this.job = anuncios[0];
      console.log(this.job);
    });

    this.usuarioService.getUsuarioById(usuario).subscribe({
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
    this.initMap(Number(latitud), Number(longitud));
    
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
  
  mostrarPopUp() {
    this.mostrarPopup = true;
  }
  
}
