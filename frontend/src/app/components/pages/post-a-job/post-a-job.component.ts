import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/models/categoria.model';
import { CategoriaService } from 'src/app/services/categoria.service';
import * as L from 'leaflet';
import { postJobService } from 'src/app/services/postJob.service';
@Component({
  selector: 'app-post-a-job',
  templateUrl: './post-a-job.component.html',
  styleUrls: ['./post-a-job.component.scss']
})
export class PostAJobComponent implements OnInit {
  categoriaSub: Subscription | undefined;
  categorias: Categoria[] = [];
  opciones: any[] = [];
  map: any;
  marker: any;
  u_latitud: number | undefined;
  u_longitud: number | undefined;

  postjobForm = this.formBuilder.group({
    id_anuncio: ['',],
    id_usuario: ['',],
    titulo: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    categoria: [''],
    precio: ['', [Validators.required]],
    direccion: ['', [Validators.required]],
    u_latitud: [''],
    u_longitud: [''],
    tiempo: ['', [Validators.required]],
    genero: [''],
    fecha_fin: [''],
    fecha_creacion: [''],
    ruta: [''],
    estado: [''],

  });
  get id_anuncio() {
    return this.postjobForm.controls.id_anuncio;
  }
  get id_usuario() {
    return this.postjobForm.controls.id_usuario;
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

  constructor(private categoriaService: CategoriaService, private formBuilder:FormBuilder, private router:Router, private postJobService: postJobService) { }


  ngOnInit(): void {
    this.opciones =     [
      {"id_categoria": 1,"nombre": "Servicios domésticos","estado": "1"},
      {"id_categoria": 2,"nombre": "Reparaciones y mantenimiento","estado": "1"},
      {"id_categoria": 3,"nombre": "Educación y tutoría","estado": "1"},
      {"id_categoria": 4,"nombre": "Eventos y entretenimiento","estado": "1"},
      {"id_categoria": 5,"nombre": "Trabajo temporal","estado": "1"},
      {"id_categoria": 6,"nombre": "Servicios profesionales","estado": "1"},
      {"id_categoria": 7,"nombre": "Cuidado de la salud","estado": "1"},
      {"id_categoria": 8,"nombre": "Transporte y logística","estado": "1"},
      {"id_categoria": 9,"nombre": "Servicios de belleza y bienestar","estado": "1"},
      {"id_categoria": 10,"nombre": "Ventas y marketing","estado": "1"}
      ];
    this.map = L.map('map').setView([-13.16042,-74.22575], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);
    this.map.on('click', this.onMapClick.bind(this));

    this.loadCategorias();
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
  }
  saveJob() {
    if(this.postjobForm.valid){
      this.postJobService.postJob(this.postjobForm.value);
      this.router.navigateByUrl('/');
      this.postjobForm.reset();
    } else {
      this.postjobForm.markAllAsTouched();
      console.log("Formulario no válido");
    }
  }
}
