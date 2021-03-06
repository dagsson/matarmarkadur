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
  allresults = [];
  kindur = [];
  svin = [];
  thorungar = [];
  naut = [];
  afli = [];
  alifuglar = [];
  hross = [];
  fiskeldi = [];
  geitur = [];
  matjurtir = [];
  skelfiskur = [];
  farmlist = [];
  producers;
  display = false;
  style = 'mapbox://styles/dagsson/cj99p8osy3in82smvtx2ie7x8';
  lat = 65.100129;
  lng = -19.018391;
  //farm: any;
  farms: any;
  farmslow;
  featureCollection = {
    type: 'FeatureCollection',
    features: []
  };
  popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
  });
  marker = new mapboxgl.Marker();
  showDropDown = false;
  
  constructor(private mapService: MapService, private issue: IssueService, private router: Router) { }

  ngOnInit() {
    this.buildMap();
  }

  onKey($event) {
    this.showDropDown = true;
    var value = $event.target.value.toLowerCase();
    //this.farmslow = this.featureCollection.features.map(response => response.properties.name.toLowerCase());
    this.farmlist = this.featureCollection.features.filter(response=> response.properties.name.toLowerCase().indexOf(value) > -1 && value.length > 2);
    console.log(this.farmlist);
    if ($event.keyCode==13) {
      this.flyToFarm(this.farmlist[0]);
    }
  }

  search($event) {
    let q = $event.target.value;
    var man = this.featureCollection.features.filter(farm => farm.properties.name === q);
    console.log(man);
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

  flyToFarm(currentFeature) {
    this.map.flyTo({
      center: currentFeature.geometry.coordinates,
      zoom: 8
    });
    this.highlightSelectedFeature(currentFeature);
  }

  highlightSelectedFeature(e) {
    var marker = this.marker.
    setLngLat(e.geometry.coordinates)
    .addTo(this.map);
  };

  displayLayer(id, type, color, array) {
    console.log(this.display);
  if (typeof this.map.getLayer(id) == 'undefined') {
  array = this.featureCollection.features.filter(farm => farm.properties.type === type);
  
  this.map.addSource(id, {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: array
    }
  });
  this.map.addLayer({
    'id': id,
    'type': 'circle',
    'source': id,
    'layout': {
        'visibility': 'visible'
    },
    'paint': {
        'circle-radius': {
            'base': 2,
            'stops': [[3, 3], [16, 32]]
        },
        'circle-color': color
      }
  });

  this.map.on('mouseenter', id, (e) => {
      this.map.getCanvas().style.cursor = 'pointer';
      var coordinates = e.features[0].geometry.coordinates.slice();
  
    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
  while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
  }

  this.popup.setLngLat(coordinates)
        .setHTML(e.features[0].properties.name)
        .addTo(this.map);
  });
  
  this.map.on('mouseleave', id,  () => {
      this.map.getCanvas().style.cursor = '';
      this.popup.remove();
  });
  this.farmlist = array;
  console.log(this.farmlist);
  }
  else { 
    var visibility = this.map.getLayoutProperty(id, 'visibility');
    if (visibility === 'none') {       
        this.map.setLayoutProperty(id, 'visibility', 'visible');
        this.farmlist = array;
        console.log(this.farmlist);
    } else {   
        this.map.setLayoutProperty(id, 'visibility', 'none');
        this.farmlist = []; 
    }
  }
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

  
