import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Job } from 'src/app/models/job.model';
import { JobService } from 'src/app/services/job.service';
import {Map, marker, tileLayer} from 'leaflet';


@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit, OnDestroy {
  ruta: string | undefined;
  job: Job | undefined;
  jobSub: Subscription | undefined;
  uLatitud: number | undefined;
  uLongitud: number | undefined;

  constructor(private route: ActivatedRoute, private jobService: JobService) { }

  ngOnInit(): void {
    this.ruta = this.route.snapshot.params['id'];
    this.jobSub = this.jobService.getJob().subscribe({ 
      next: (jobs: Job[]) => {
        this.job = jobs.filter( p => p.ruta === this.ruta)[0];
        this.uLatitud = parseFloat(this.job.u_latitud);
        this.uLongitud = parseFloat(this.job.u_longitud);
        console.log(this.job);
        console.log(this.uLatitud);
        console.log(this.uLongitud);
        this.initMap(this.uLatitud, this.uLongitud);
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }
  
  ngOnDestroy(): void {
    this.jobSub?.unsubscribe();
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
