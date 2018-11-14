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

  map: any;
  results = [];
  vestur = [];
  nordvestur = [];
  nordaustur = [];
  sudur = [];
  style = 'mapbox://styles/dagsson/cj99p8osy3in82smvtx2ie7x8';
  lat = 65.100129;
  lng = -19.018391;
  //farm: any;
  farms: any;
  featureCollection = {
    type: 'FeatureCollection',
    features: []
  };
  model = {
    vestur: false,
    nordvestur: false,
    nordaustur: false,
    sudur: false,
  };
  
  
  constructor(private mapService: MapService, private issue: IssueService, private router: Router) { }

  ngOnInit() {
    //this.fetchFarms();
    /*this.issue.getIssues().subscribe((issues) => {
      if (issues)
      this.farm = issues[0];
    })*/
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

  toGeoJson(array) {
    this.featureCollection = {
      type: 'FeatureCollection',
      features: []
    };
    var data = array;
    for (var i = data.length - 1; i >= 0; i--) {
      var feature = data[i]; 
      this.featureCollection.features.push(feature);
    }
  }

  displayLayer() {
    this.results = this.featureCollection.features.filter(farm => farm.properties.area === 'Vesturumdæmi');
    this.toGeoJson(this.results);
    this.map.addSource('farm', {
      type: 'geojson',
      data: this.featureCollection
    });
    this.map.addLayer({
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

    var popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    });

    this.map.on('mouseenter', 'Kindur', (e) => {
      this.map.getCanvas().style.cursor = 'pointer';
      var coordinates = e.features[0].geometry.coordinates.slice();
    
      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      popup.setLngLat(coordinates)
          .setHTML(e.features[0].properties.name)
          .addTo(this.map);
    });
    
    this.map.on('mouseleave', 'Kindur', () => {
        this.map.getCanvas().style.cursor = '';
        popup.remove();
    });
    this.fetchFarms();
  }

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
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 4.90,
      center: [this.lng, this.lat]
    });
    this.fetchFarms()
  }
}
