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

  
}
