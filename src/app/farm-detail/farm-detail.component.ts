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
  lambAndCarcass:any = [];
  

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
 
      this.carcass = data;


      this.lambs = [];
      this.blockchainService.getLamb().subscribe((data: {})=>
      {
 
        this.lambs = data;


        

        var resultArray = Object.keys(data).map(function(func){
          let dataset1 = data[func];
          return dataset1;
        });


        let result = resultArray.map((a)=>{
          let obj2 = this.carcass.find((b)=> a.lambId === b.carcassId);
          if(obj2)
            Object.assign(a,obj2);
            return a;
        });

        this.lambAndCarcass = result;
    
      })
    })
  }

}
