import { Component, OnInit } from '@angular/core';
import { FARMS } from '../mock-farms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FarmService }  from '../farm.service';
import { BlockchainDataService} from '../blockchain-data.service';

@Component({
  selector: 'app-farm-detail',
  templateUrl: './farm-detail.component.html',
  styleUrls: ['./farm-detail.component.css']
})
export class FarmDetailComponent implements OnInit {

  lambs:any = [];
  carcass:any = [];

  farm: any;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private farmService: FarmService,
    private blockchainService: BlockchainDataService
  ) { }

  ngOnInit() {
    this.getFarm();
    this.getCarcass();
    this.getLamb();
    window.scrollTo(0, 0);
  }

  getFarm(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.farmService.getFarm(id)
      .subscribe(farm => this.farm = farm);
  }

  goBack(): void {
    this.location.back();
  }

  getCarcass(): void {
    //var info = this.blockchainService.getFarmer();
    this.carcass = [];
    this.blockchainService.getCarcass().subscribe((data: {})=>
    {
      console.log(data);
      this.carcass = data;
    })

  }

  getLamb(): void {
    //var info = this.blockchainService.getFarmer();
    this.lambs = [];
    this.blockchainService.getLamb().subscribe((data: {})=>
    {
      console.log(data);
      this.lambs = data;
    })

  }

}
