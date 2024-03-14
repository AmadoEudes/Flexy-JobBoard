import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/models/categoria.model';
import { CategoriaService } from 'src/app/services/categoria.service';
import * as L from 'leaflet';
import { postJobService } from 'src/app/services/postJob.service';
import { ChangeDetectorRef } from '@angular/core';
import { Job } from 'src/app/models/job.model';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-post-a-job',
  templateUrl: './post-a-job.component.html',
  styleUrls: ['./post-a-job.component.scss']
})
export class PostAJobComponent implements OnInit {
  aux_id_usuario: string;
  categoriaSub: Subscription | undefined;
  categorias: Categoria[] = [];
  opciones: any[] = [];
  map: any;
  marker: any;
  u_latitud: number | undefined;
  u_longitud: number | undefined;
  isLoggedIn: boolean;
  user_login_id: string;
  constructor(private categoriaService: CategoriaService, private formBuilder:FormBuilder, private router:Router, private jobService: JobService, private cdRef: ChangeDetectorRef ) { 
  }

  data: Job;
  postjobForm = new FormGroup({
    usuario: new FormControl(),
    titulo: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    categoria: new FormControl('', [Validators.required]),
    precio: new FormControl('', [Validators.required]),
    direccion: new FormControl('', [Validators.required]),
    u_latitud: new FormControl('', [Validators.required]),
    u_longitud: new FormControl('', [Validators.required]),
    tiempo: new FormControl('', [Validators.required]),
    genero: new FormControl('', [Validators.required]),
    fecha_fin: new FormControl('', [Validators.required]),
    fecha_creacion: new FormControl(''),
    ruta: new FormControl(''),
    estado: new FormControl('1'),
  });
  
  ngOnInit(): void {
    
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      const userDataParsed = JSON.parse(userData);
      this.isLoggedIn = true;
      this.user_login_id = userDataParsed.user_id; // O cualquier otro dato relevante del usuario
      console.log("Usuario inició sesión: " + this.user_login_id);
    }
    
    this.opciones =     [
      {"id_categoria": 1,"nombre": "Cuidado del Hogar","estado": "1"},
      {"id_categoria": 2,"nombre": "Reparaciones y Mantenimientos","estado": "1"},
      {"id_categoria": 3,"nombre": "Educación y Tutoría","estado": "1"},
      {"id_categoria": 4,"nombre": "Cuidado y Atención","estado": "1"},
      {"id_categoria": 5,"nombre": "Entrenamiento y fitness","estado": "1"},
      {"id_categoria": 6,"nombre": "Eventos y Entretenimiento","estado": "1"},
      {"id_categoria": 7,"nombre": "Transporte","estado": "1"},
      {"id_categoria": 8,"nombre": "Soporte Administrativo","estado": "1"},
      {"id_categoria": 9,"nombre": "Limpieza","estado": "1"},
      {"id_categoria": 10,"nombre": "Jardinería","estado": "1"}
      ];
    this.map = L.map('map').setView([-13.16042,-74.22575], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);
    this.map.on('click', this.onMapClick.bind(this));

    this.loadCategorias();
  }

  get id_usuario() {
    return this.postjobForm.controls.usuario;
  }
  get titulo() {
    return this.postjobForm.controls.titulo;
  }
  get descripcion() {
    return this.postjobForm.controls.descripcion;
  }
  get categoria() {
    return this.postjobForm.controls.categoria;
  }
  get precio() {
      return this.postjobForm.controls.precio;  
  } 
  get direccion() {
    return this.postjobForm.controls.direccion;
  }
  get latitud() {
    return this.postjobForm.controls.u_latitud;
  }
  get longitud() {
    return this.postjobForm.controls.u_longitud;
  }
  get tiempo() {
    return this.postjobForm.controls.tiempo;
  }
  get genero() {
    return this.postjobForm.controls.genero;
  }
  get fecha_fin() {
    return this.postjobForm.controls.fecha_fin;
  }
  get fecha_creacion() {
    return this.postjobForm.controls.fecha_creacion;
  }
  get ruta() {
    return this.postjobForm.controls.ruta;
  }
  get estado() {
    return this.postjobForm.controls.estado;
  }

  loadCategorias() {
    this.categoriaSub = this.categoriaService.getCategoria().subscribe({
      next: (categorias: Categoria[]) => {
        this.categorias = categorias;
      },
      error: (error: any) => {
        console.error('Error al cargar las categorias:', error);
      },
      complete: () => {
        console.log('complete');
      }
    });
  }
  ngOnDestroy(): void {
    this.categoriaSub?.unsubscribe();
  }

  onMapClick(e: any) {
    // Elimina el marcador existente (si hay uno)
    if (this.marker) {
      this.map.removeLayer(this.marker);
    }
    // Crea un nuevo marcador en la ubicación del click
    this.marker = L.marker(e.latlng).addTo(this.map);

    // Recupera la latitud y longitud del marcador y almacénalas en variables
    const latitud = e.latlng.lat;
    const longitud = e.latlng.lng;
    this.u_latitud = latitud;
    this.u_longitud = longitud;
    this.setUbicacionValues();
  }
  saveJob() {
    if(this.postjobForm.valid){
      this.data = { ...(this.postjobForm.value)} as Job;


      //Primero se asignará el valor ID del usuario
      console.log(this.user_login_id);
      this.data.usuario = Number(this.user_login_id);
      //Luego el valor de la fecha en la que se creó y el valor de la ruta
      this.createRutaFechaCreacion();

      console.log(this.data);
      this.jobService.addAnuncio(this.data).subscribe(data => {
        this.router.navigate(['/']);
      }) 
      this.postjobForm.reset();
    } else {
      this.postjobForm.markAllAsTouched();
      console.log("Formulario no válido");
    }
  }
  setUbicacionValues(): void {
    this.postjobForm.patchValue({
      u_latitud: this.u_latitud.toString(),
      u_longitud: this.u_longitud.toString()
    });
  }
  /**createRuta() {
    const idUsuario = this.postjobForm.value.id_usuario;
    const idAnuncio = this.postjobForm.value.id_anuncio;
    const ruta = `${idUsuario}_${idAnuncio}`;
    this.postjobForm.patchValue({ 
      ruta: ruta,
    });
  }
  */
  createRutaFechaCreacion(){
    const fechaCreacion = new Date().toISOString();
    this.data.fecha_creacion = fechaCreacion.slice(0, 19) + 'Z';
    const fechaCreacionShort = this.data.fecha_creacion.slice(0, 19) + 'Z';
    this.data.ruta = `${this.data.usuario}_${fechaCreacionShort}_${this.data.u_latitud}_${this.data.u_longitud}_${this.data.titulo}`;
  }

}
