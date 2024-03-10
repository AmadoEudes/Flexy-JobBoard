import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Job } from 'src/app/models/job.model';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-trabajo-lista',
  templateUrl: './trabajo-lista.component.html',
  styleUrls: ['./trabajo-lista.component.css']
})
export class TrabajoListaComponent implements OnInit, OnDestroy {

  job: Job[] = [];
  jobSub: Subscription | undefined;
  loading: boolean = true; // Variable para indicar si se están cargando los datos

  constructor(private jobService: JobService) { }

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs() {
    this.loading = true; // Establece loading en true antes de iniciar la carga de datos
    
    this.jobSub = this.jobService.getJob().subscribe({
      next: (jobs: Job[]) => {
        this.job = jobs;
        //this.loading = false; // Una vez que se han cargado los datos correctamente, establece loading en false
      },
      error: (error: any) => {
        console.error('Error al cargar los trabajos:', error);
        //this.loading = false; // En caso de error, también establece loading en false
      },
      complete: () => {
        console.log('complete');
      }
    });
  }
  
  ngOnDestroy(): void {
    this.jobSub?.unsubscribe();
  }
}
