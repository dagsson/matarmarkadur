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
import { AuthService } from '../auth.service';
declare var $ : any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

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
  prodId: any;
  listId: any;
  selectedFarm = null;
  display = false;
  nautToggle = false;
  kindToggle = false;
  hrossToggle = false;
  skelfiskurToggle = false;
  svinToggle = false;
  matjurtirToggle = false;
  thorungarToggle = false;
  afliToggle = false;
  geiturToggle = false;
  fiskeldiToggle = false;
  alifuglarToggle = false;
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
  bounds = [
    [-31.653, 61.530],
    [-6.257, 68.675]
]; 
  popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
  });
  //marker = new mapboxgl.Marker();
  showDropDown = false;
  
  constructor(private mapService: MapService, private issue: IssueService, private router: Router, public authService: AuthService) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.buildMap();
  }

  onKey($event) {
    var currentFocus = 0;
    this.showDropDown = true;
    var value = $event.target.value.toLowerCase();
    this.farmlist = this.featureCollection.features.filter(response=> response.properties.name.toLowerCase().indexOf(value) > -1 && value.length > 2);
    if (value.length > 2) {
      document.getElementById('autocomplete').style.display = "block";
    } else {
      document.getElementById('autocomplete').style.display = "none";
    }
    if ($event.keyCode==13) {
      if (this.farmlist[0]) {
      this.prodId = this.farmlist[0]._id;
      document.getElementById('autocomplete').style.display = 'none';
      this.display = false;
      this.flyToFarm(this.farmlist[0]);
      (<HTMLInputElement>document.getElementById('leit')).value = this.farmlist[0].properties.name;
    } else {
      console.log("Enginn framleiðandi með þessu nafni");
    }
    }
    
    window.addEventListener('mouseup', function(event){
      var box = document.getElementById('autocomplete');
      if (event.target != box ){
            box.style.display = 'none';
        }
    });
  }

  flyToFarm(currentFeature) {
    if (currentFeature) {
    this.map.flyTo({
      center: currentFeature.geometry.coordinates,
      zoom: 8
    });
    this.selectedFarm = currentFeature;
    document.getElementById('autocomplete').style.display = 'none';
    this.highlightSelectedFeature(currentFeature);
    if (this.authService.user) {
      document.getElementById('selectedFarmCard').style.left = '0px';
    }
  } else {
    console.log("Enginn framleiðandi með þessu nafni");
  }
  }

  highlightSelectedFeature(e) {
    this.listToLayer(e.properties.type);
    if (this.map.getLayer(this.listId)) {
    var layerColor = this.map.getLayer(this.listId)._transitionablePaint._values["circle-color"].value.value;
    var popUps = document.getElementsByClassName('mapboxgl-popup');
    if (popUps[0]) popUps[0].remove();
    var popup = new mapboxgl.Popup({ closeOnClick: true })
      .setLngLat(e.geometry.coordinates)
      .setHTML('<h4 class="selected" style="background:' + layerColor + ';">' + e.properties.type + '</h4>' +
        '<h4>' + e.properties.name + '</h4>')
      .addTo(this.map);
    } else {
      var popUps = document.getElementsByClassName('mapboxgl-popup');
      if (popUps[0]) popUps[0].remove();
      var popup = new mapboxgl.Popup({ closeOnClick: true })
        .setLngLat(e.geometry.coordinates)
        .setHTML('<h4 class="selected" style="background: green;">' + e.properties.type + '</h4>' +
          '<h4>' + e.properties.name + '</h4>')
        .addTo(this.map);
      }
   };

  closeCard() {
    document.getElementById('selectedFarmCard').style.left = '-460px';
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

  findId(prodId) {
    var id = this.featureCollection.features.filter(prod => prod.properties.id === prodId);
    this.prodId = id[0]._id;
  }

  layerToList(id) {
    if (id == 'naut') {
      id = 'NAUTGRIPIR';
    } else if (id == 'kindur') {
      id = 'SAUÐFÉ';
    } else if (id == 'hross') {
      id = 'HROSS';
    } else if (id == 'svin') {
      id = 'SVÍN';
    } else if (id == 'matjurtir') {
      id = 'MATJURTARÆKT';
    } else if (id == 'afli') {
      id = 'SKIP - Fiskiskip';
    } else if (id == 'fiskeldi') {
      id = 'FISKELDI';
    } else if (id == 'alifuglar') {
      id = 'ALIFUGLAR';
    } else if (id == 'skelfiskur') {
      id = 'SKELFISKRÆKTUN';
    } else if (id == 'thorungar') {
      id = 'ÞÖRUNGAR/SJÁVARAFURÐIR';
    } else if (id == 'geitur') {
      id = 'GEITUR';
    }
    this.listId = id;
  }

  listToLayer(id) {
    if (id == 'NAUTGRIPIR') {
      id = 'naut';
    } else if (id == 'SAUÐFÉ') {
      id = 'kindur';
    } else if (id == 'HROSS') {
      id = 'hross';
    } else if (id == 'SVÍN') {
      id = 'svin';
    } else if (id == 'MATJURTARÆKT') {
      id = 'matjurtir';
    } else if (id == 'SKIP - Fiskiskip') {
      id = 'afli';
    } else if (id == 'FISKELDI') {
      id = 'fiskeldi';
    } else if (id == 'ALIFUGLAR') {
      id = 'alifuglar';
    } else if (id == 'SKELFISKRÆKTUN') {
      id = 'skelfiskur';
    } else if (id == 'ÞÖRUNGAR/SJÁVARAFURÐIR') {
      id = 'thorungar';
    } else if (id == 'GEITUR') {
      id = 'geitur';
    }
    this.listId = id;
  }

  displayLayer(id, type, color, array) {
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
      .setHTML('<h3 style="background:' + color + ';">' + e.features[0].properties.type.toUpperCase() + '</h3>' + '<h4>' + e.features[0].properties.name + '</h4>')
      .addTo(this.map);
  });
  
  this.map.on('mouseleave', id,  () => {
      this.map.getCanvas().style.cursor = '';
      this.popup.remove();
  });

  this.map.on('click', id, (e) => {
    var prodId = e.features[0].properties.id;
    this.findId(prodId);
    var clickedPoint = e.features[0];
    this.flyToFarm(clickedPoint);
    this.selectedFarm = e.features[0];
  });
  this.farmlist = array;
  }
  else { 
    var visibility = this.map.getLayoutProperty(id, 'visibility');
    if (visibility === 'none') {       
        this.map.setLayoutProperty(id, 'visibility', 'visible');
        this.farmlist = array;
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
      zoom: 3.30,
      center: [this.lng, this.lat],
      maxBounds: this.bounds
    });
    this.map.scrollZoom.disable();
    this.map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
    this.fetchFarms()
  }
}

  

