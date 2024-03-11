import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Job } from 'src/app/models/job.model';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-trabajo-lista',
  templateUrl: './trabajo-lista.component.html',
  styleUrls: ['./trabajo-lista.component.css']
})
export class TrabajoListaComponent implements OnInit{
  anuncios: any | undefined;

  job: Job[] = [];
  
  constructor(private jobService: JobService) { }

  ngOnInit(): void {
    this.jobService.getAnuncios().subscribe({
      next: (data: Job[]) => {
        this.job = data;
        console.log(this.job);
      },
      error: (error: any) => {
        console.error('Error al cargar los anuncios:', error);
      },
      complete: () => {
        console.log('Los anuncios cargaron correctamente.');
      }
    });
  }

  deleteAnuncio(id: number) {
    this.jobService.deleteAnuncioById(id).subscribe(data => {
      console.log(data);
      this.ngOnInit();
    });
  }
}
