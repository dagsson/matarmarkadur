import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MapService } from '../map.service';
import { GeoJson, FeatureCollection } from '../map';
//import { FARMS } from '../mock-farms';
import { IssueService } from '../issue.service';
import { Issue } from '../issue.model';
import { RouterModule, Routes, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { FilterPipe} from '../farmfilter.pipe';
declare var $ : any;

@Component({
  selector: 'app-mainmap',
  templateUrl: './mainmap.component.html',
  styleUrls: ['./mainmap.component.css']
})

export class MainmapComponent implements OnInit {

  displayedColumns = ['title', 'responsible', 'severity', 'status', 'actions'];

  style = 'mapbox://styles/dagsson/cj99p8osy3in82smvtx2ie7x8';
  lat = 65.100129;
  lng = -19.018391;
  //farm: any;
  farms: any;
  featureCollection = {
    type: 'FeatureCollection',
    features: []
  };
  
  constructor(private mapService: MapService, private issue: IssueService, private router: Router) { }

  ngOnInit() {
    this.fetchFarms();
    /*this.issue.getIssues().subscribe((issues) => {
      if (issues)
      this.farm = issues[0];
    })*/
    this.initializeMap();
  }

  private initializeMap() {
    this.buildMap();
  }

 fetchFarms() {
    this.issue
      .getIssues()
      .subscribe((data: any) => {
        this.farms = data;
        for (var i = data.length - 1; i >= 0; i--) {
          var feature = data[i]; 
          this.featureCollection.features.push(feature);
        }
        })
    };

  editFarm(id) {
    this.router.navigate([`/edit/${id}`]);
  }

  deleteFarm(id) {
    this.issue.deleteIssue(id).subscribe(() => {
      this.featureCollection.features = [];
      this.fetchFarms();
    })
  }

  buildMap() {
    var map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 4.90,
      center: [this.lng, this.lat]
    });
    map.on('load', () => { 
      map.addSource('farm', {
        type: 'geojson',
        data: this.featureCollection
      });

    map.addLayer({
      'id': 'Kindur',
      'type': 'circle',
      'source': 'farm',
      'layout': {
          'visibility': 'visible'
      },
      'paint': {
          'circle-radius': {
              'base': 2,
              'stops': [[3, 3], [16, 32]]
          },
          'circle-color': 'rgb(84,48,5)'
        }
    });
});
}
}
