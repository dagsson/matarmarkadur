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

  public isCollapsed = false;

  map: any;
  results = [];
  allresults = [];
  kindur = [];
  svin = [];
  naut = [];
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
  popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
  });
  
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

  flyToFarm(currentFeature) {
    this.map.flyTo({
      center: currentFeature.geometry.coordinates,
      zoom: 8
    });
    this.highlightSelectedFeature(currentFeature);
  }

  highlightSelectedFeature(e) {
    var el = document.createElement('div');
    el.className = 'marker';
    el.style.width = '40px';
    el.style.height = '40px';
    el.style.backgroundColor = 'red';
    new mapboxgl.Marker(el)
    .setLngLat(e.geometry.coordinates)
    .addTo(this.map);
};

  displayLayerKind() {
    if (this.kindur.length === 0) {
    this.kindur = this.featureCollection.features.filter(farm => farm.properties.type === 'SAUÐFÉ');
    
    this.map.addSource('sheep', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: this.kindur
      }
    });
    this.map.addLayer({
      'id': 'Kindur',
      'type': 'circle',
      'source': 'sheep',
      'layout': {
          'visibility': 'visible'
      },
      'paint': {
          'circle-radius': {
              'base': 2,
              'stops': [[3, 3], [16, 32]]
          },
          'circle-color': 'blue'
        }
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

    this.popup.setLngLat(coordinates)
          .setHTML(e.features[0].properties.name)
          .addTo(this.map);
    });
    
    this.map.on('mouseleave', 'Kindur',  () => {
        this.map.getCanvas().style.cursor = '';
        this.popup.remove();
    });
  }
  else { 
    var visibility = this.map.getLayoutProperty('Kindur', 'visibility');
    if (visibility === 'none') {
        this.map.setLayoutProperty('Kindur', 'visibility', 'visible');    
    } else {
        this.map.setLayoutProperty('Kindur', 'visibility', 'none');
    }
  }
  this.allresults = this.results.concat(this.kindur);
  console.log(this.allresults);
}

displayLayerSvin() {
  if (this.svin.length === 0) {
  this.svin = this.featureCollection.features.filter(farm => farm.properties.type === 'SVÍN');
  
  this.map.addSource('pig', {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: this.svin
    }
  });
  this.map.addLayer({
    'id': 'pig',
    'type': 'circle',
    'source': 'pig',
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

  this.map.on('mouseenter', 'pig', (e) => {
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
  
  this.map.on('mouseleave', 'pig',  () => {
      this.map.getCanvas().style.cursor = '';
      this.popup.remove();
  });
}
else { 
  var visibility = this.map.getLayoutProperty('pig', 'visibility');
  if (visibility === 'none') {
      this.map.setLayoutProperty('pig', 'visibility', 'visible');    
  } else {
      this.map.setLayoutProperty('pig', 'visibility', 'none');
  }
}
this.allresults = this.results.concat(this.svin);
console.log(this.allresults);
}

  displayLayerNaut() {
    if (this.naut.length === 0) {
    this.naut = this.featureCollection.features.filter(farm => farm.properties.Type === 'NAUTGRIPIR');
    this.map.addSource('naut', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: this.naut
      }
    });
    this.map.addLayer({
      'id': 'naut',
      'type': 'circle',
      'source': 'naut',
      'layout': {
          'visibility': 'visible'
      },
      'paint': {
          'circle-radius': {
              'base': 2,
              'stops': [[3, 3], [16, 32]]
          },
          'circle-color': 'orange'
        }
    });
    this.map.on('mouseenter', 'naut', (e) => {
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
    this.map.on('mouseleave', 'naut',  () => {
        this.map.getCanvas().style.cursor = '';
        this.popup.remove();
    });
  }
  else { 
    var visibility = this.map.getLayoutProperty('naut', 'visibility');
    if (visibility === 'none') {
        this.map.setLayoutProperty('naut', 'visibility', 'visible');    
    } else {
        this.map.setLayoutProperty('naut', 'visibility', 'none');
    }
  }
  this.allresults = this.results.concat(this.naut);
  console.log(this.allresults);
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

  
