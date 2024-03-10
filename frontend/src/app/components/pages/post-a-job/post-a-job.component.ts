import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/models/categoria.model';
import { CategoriaService } from 'src/app/services/categoria.service';
import * as L from 'leaflet';
import { postJobService } from 'src/app/services/postJob.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-post-a-job',
  templateUrl: './post-a-job.component.html',
  styleUrls: ['./post-a-job.component.scss']
})
export class PostAJobComponent implements OnInit {
  categoriaSub: Subscription | undefined;
  categorias: Categoria[] = [];

  selectedState: string;
  states = [
    {name: 'Arizona', abbrev: 'AZ'},
    {name: 'California', abbrev: 'CA'},
    {name: 'Colorado', abbrev: 'CO'},
    {name: 'New York', abbrev: 'NY'},
    {name: 'Pennsylvania', abbrev: 'PA'},
  ];


  opciones: any[] = [];
  map: any;
  marker: any;
  u_latitud: number | undefined;
  u_longitud: number | undefined;
  postjobForm: FormGroup;


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

  constructor(private categoriaService: CategoriaService, private formBuilder:FormBuilder, private router:Router, private postJobService: postJobService, private cdRef: ChangeDetectorRef) { 
  }


  ngOnInit(): void {
    this.postjobForm = this.formBuilder.group({
      id_anuncio: ['',],
      id_usuario: ['',],
      titulo: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      categoria: [''],
      precio: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      u_latitud: ['', [Validators.required]],
      u_longitud: ['', [Validators.required]],
      tiempo: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      fecha_fin: ['', [Validators.required]],
      fecha_creacion: [''],
      ruta: [''],
      estado: [''],
  
    });

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
    this.setUbicacionValues();
  }
  saveJob() {
    if(this.postjobForm.valid){
      //Primero se asignará el valor ID del usuario
      //El valor de ID anuncio se asigna automaticamente en la base de datos
      //Luego el valor de la fecha en la que se creó
      this.createFechaCreacion();
      //Luego se creará la ruta
      this.createRuta();
      this.postJobService.postJob(this.postjobForm.value);
      this.router.navigateByUrl('/');
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
  createRuta() {
    const idUsuario = this.postjobForm.value.id_usuario;
    const idAnuncio = this.postjobForm.value.id_anuncio;
    const ruta = `${idUsuario}_${idAnuncio}`;
    this.postjobForm.patchValue({ 
      ruta: ruta,
    });
  }
  createFechaCreacion(){
    const fechaCreacion = new Date();
    this.postjobForm.patchValue({
      fecha_creacion: fechaCreacion.toISOString()
    });
  }
  onSelectionChange(event: any) {
    // Actualizar el valor del modelo
    this.selectedState = event.target.value;
  
    // Forzar la actualización del ciclo de vida
    this.cdRef.detectChanges();
  }
}
