import { Component, OnInit } from '@angular/core';
import { FARMS } from '../mock-farms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FarmService }  from '../farm.service';

@Component({
  selector: 'app-farm-detail',
  templateUrl: './farm-detail.component.html',
  styleUrls: ['./farm-detail.component.css']
})
export class FarmDetailComponent implements OnInit {

  farm: any;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private farmService: FarmService
  ) { }

  ngOnInit() {
    this.getFarm();
    console.log(this.farm);
  }

  getFarm(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.farmService.getFarm(id)
      .subscribe(farm => this.farm = farm);
  }

  goBack(): void {
    this.location.back();
  }

}
