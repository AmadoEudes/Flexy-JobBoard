import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/models/categoria.model';
import { CategoriaService } from 'src/app/services/categoria.service';
import * as L from 'leaflet';
import { postJobService } from 'src/app/services/postJob.service';
import { AnuncioModel } from 'src/app/model/anuncio-model';
import { AnuncioService } from 'src/app/service/anuncio.service';
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
  listJobs: AnuncioModel[] = [];


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
  get id_anuncio() {return this.postjobForm.controls.id_anuncio;}
  get id_usuario() {return this.postjobForm.controls.id_usuario;}
  get titulo() {return this.postjobForm.controls.titulo;}
  get descripcion() {return this.postjobForm.controls.descripcion;  }
  get categoria() {return this.postjobForm.controls.categoria;}
  get precio() {return this.postjobForm.controls.precio;} 
  get direccion() {return this.postjobForm.controls.direccion;}
  get latitud() {return this.postjobForm.controls.u_latitud;}
  get longitud() {return this.postjobForm.controls.u_longitud;}
  get tiempo() {return this.postjobForm.controls.tiempo;}
  get genero() {return this.postjobForm.controls.genero;}
  get fecha_fin() {return this.postjobForm.controls.fecha_fin;}
  get fecha_creacion() {return this.postjobForm.controls.fecha_creacion;}
  get ruta() {return this.postjobForm.controls.ruta;}
  get estado() {return this.postjobForm.controls.estado;}

  constructor(private categoriaService: CategoriaService, private formBuilder:FormBuilder, 
    private router:Router, private postJobService: postJobService,
    private anuncioService: AnuncioService) { }


  ngOnInit(): void {
    this.list();
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

  list(){
    this.anuncioService.getAnuncios().subscribe(resp=>{
      if(resp){
        this.listJobs = resp;
      }
    });
  }

  save(){    
    this.postjobForm.patchValue({
      estado: '1'
    });
    try {
      if (this.postjobForm.valid) {
          const formData = this.postjobForm.value;
          
          const nuevoAnuncio: AnuncioModel = {
              id_anuncio: +formData.id_anuncio,
              id_usuario: +formData.id_usuario,
              titulo: formData.titulo,
              descripcion: formData.descripcion,
              categoria: formData.categoria,
              precio: +formData.precio,
              direccion: formData.direccion,
              u_latitud: formData.u_latitud,
              u_longitud: formData.u_longitud,
              tiempo: formData.tiempo,
              genero: formData.genero,
              fecha_fin: new Date(formData.fecha_fin), 
              fecha_creacion: new Date(formData.fecha_creacion),
              ruta: formData.ruta,
              estado: formData.estado
          };
          
          this.anuncioService.saveAnuncio(nuevoAnuncio).toPromise();
          
          this.postjobForm.reset();
      } else {
          this.postjobForm.markAllAsTouched();
          console.log("Formulario no válido");
      }
    } catch (error) {
      console.error('Error al guardar datos:', error);
    }
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
