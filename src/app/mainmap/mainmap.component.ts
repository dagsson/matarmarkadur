import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MapService } from '../map.service';
import { GeoJson, FeatureCollection } from '../map';
import { FARMS } from '../mock-farms';
import { IssueService } from '../issue.service';
declare var $ : any;

@Component({
  selector: 'app-mainmap',
  templateUrl: './mainmap.component.html',
  styleUrls: ['./mainmap.component.css']
})

export class MainmapComponent implements OnInit {

  style = 'mapbox://styles/dagsson/cj99p8osy3in82smvtx2ie7x8';
  lat = 65.100129;
  lng = -19.018391;
  farm: any;
  
  constructor(private mapService: MapService, private issue: IssueService) { }

  ngOnInit() {
    this.issue.getIssues().subscribe((issues) => {
      if (issues)
      this.farm = issues[0];
    })
    this.initializeMap();
  }

  private initializeMap() {
    this.buildMap();
  }

  buildMap() {
    var map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 4.90,
      center: [this.lng, this.lat]
    });

    map.on('load', () => {
      console.log(this.farm);      
      map.addSource('farm', {
        type: 'geojson',
        data: this.farm
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
