import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MapService } from '../map.service';
import { GeoJson, FeatureCollection } from '../map';
import {Router} from "@angular/router";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-bigmap',
  templateUrl: './bigmap.component.html',
  styleUrls: ['./bigmap.component.css']
})
export class BigmapComponent implements OnInit {

  private urls = ['https://api.mapbox.com/datasets/v1/dagsson/cjgxrynuy1nhn2wmoqz4sn8fu/features', 'https://api.mapbox.com/datasets/v1/dagsson/cjgxsaekx0cdv33o8zncly704/features', 'https://api.mapbox.com/datasets/v1/dagsson/cjl8568s70jg12vlgnxyw0p9g/features', 'https://api.mapbox.com/datasets/v1/dagsson/cjgxs7hoc07ly2wmx7wc7qjz9/features', 'https://api.mapbox.com/datasets/v1/dagsson/cjl84jijf0inv2uruidekzdw1/features', 'https://api.mapbox.com/datasets/v1/dagsson/cjl84fisc05zf2qnz5x84dgjx/features', 'https://api.mapbox.com/datasets/v1/dagsson/cjl848pqj0j0s2ql3t6s5ukg4/features', 'https://api.mapbox.com/datasets/v1/dagsson/cjl83jmld0j6m2vqkzr56ngw5/features', 'https://api.mapbox.com/datasets/v1/dagsson/cjl83gvwh0iwe2vrui3axviv4/features', 'https://api.mapbox.com/datasets/v1/dagsson/cjl83eiez0ivr2vrusczd8v9r/features'];
  map: mapboxgl.Map;
  style = 'mapbox://styles/dagsson/cj99p8osy3in82smvtx2ie7x8';
  lat = 65.900529;
  lng = -19.018391;

  showDropDown = false;

  // data
  source: any;
  markers: any;
  link: any;

  constructor(private mapService: MapService) { }

  ngOnInit() {
    this.initializeMap()
  }

  private initializeMap() {
    this.buildMap();
  }

  buildMap() {
    var map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 5.55,
      center: [this.lng, this.lat]
    });

    //map.scrollZoom.disable();

    var popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    });

    function flyToStore(currentFeature) {
      map.flyTo({
        center: currentFeature.geometry.coordinates,
        zoom: 12
      });
    }

    map.on('load', function () {
      map.addControl(new mapboxgl.GeolocateControl({
          positionOptions: {
              enableHighAccuracy: true
          },
          trackUserLocation: true
      }), 'bottom-right');

      var nav = new mapboxgl.NavigationControl();
      map.addControl(nav, 'bottom-right');

    map.addSource('naut', {
        type: 'vector',
        url: 'mapbox://dagsson.cjl84fisc05zf2qnz5x84dgjx-53nf3'
    });
    map.addLayer({
        'id': 'Nautgripir',
        'type': 'circle',
        'source': 'naut',
        'imgsource': '../assets/img/cow.png',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'circle-radius': {
                'base': 2,
                'stops': [[3, 3], [16, 32]]
            },
            'circle-color': 'rgb(84,48,5)'
        },
        'source-layer': 'nautgripir_ag2018'
    });
    map.on('click', 'Nautgripir', function (e) {
        var clickedPoint = e.features[0];
        flyToStore(clickedPoint);
    });

    // Change the cursor to a pointer when the mouse is over the states layer.
    map.on('mouseenter', 'Nautgripir', function (e) {
      map.getCanvas().style.cursor = 'pointer';
      var coordinates = e.features[0].geometry.coordinates.slice();
      var description = e.features[0].properties.description;

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      // Populate the popup and set its coordinates
      // based on the feature found.
      popup.setLngLat(coordinates)
          .setHTML(e.features[0].properties.Name)
          .addTo(map);
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'Nautgripir', function () {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });

    map.addSource('kind', {
        type: 'vector',
        url: 'mapbox://dagsson.cjl84jijf0inv2uruidekzdw1-60rdm'
    });
    map.addLayer({
        'id': 'Sauðfé',
        'icon': '',
        'type': 'circle',
        'source': 'kind',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'circle-radius': {
                'base': 2,
                'stops': [[3, 3], [16, 32]]
            },
            'circle-color': '#8c510a'
        },
        'source-layer': 'saudfe_ag2018'
    });
  
    map.on('click', 'Sauðfé', function (e) {
        var clickedPoint = e.features[0];
        flyToStore(clickedPoint);
    });

    // Change the cursor to a pointer when the mouse is over the states layer.
    map.on('mouseenter', 'Sauðfé', function (e) {
      map.getCanvas().style.cursor = 'pointer';
      var coordinates = e.features[0].geometry.coordinates.slice();
      var description = e.features[0].properties.description;

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      // Populate the popup and set its coordinates
      // based on the feature found.
      popup.setLngLat(coordinates)
          .setHTML(e.features[0].properties.Name)
          .addTo(map);
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'Sauðfé', function () {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });

    // Thorungar

    map.addSource('thorungar', {
      type: 'vector',
      url: 'mapbox://dagsson.cjgxsaywq0bdn32mswtdla8f4-8ocuk'
  });
  map.addLayer({
      'id': 'Þörungar',
      'icon': '',
      'type': 'circle',
      'source': 'thorungar',
      'layout': {
          'visibility': 'none'
      },
      'paint': {
          'circle-radius': {
              'base': 2,
              'stops': [[3, 3], [16, 32]]
          },
          'circle-color': '#bf812d'
      },
      'source-layer': 'Thorungar_merged'
  });
  map.on('click', 'Þörungar', function (e) {
      var clickedPoint = e.features[0];
      flyToStore(clickedPoint);
  });

 // Change the cursor to a pointer when the mouse is over the states layer.
 map.on('mouseenter', 'Þörungar', function (e) {
  map.getCanvas().style.cursor = 'pointer';
  var coordinates = e.features[0].geometry.coordinates.slice();

  // Ensure that if the map is zoomed out such that multiple
  // copies of the feature are visible, the popup appears
  // over the copy being pointed to.
  while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
  }

  // Populate the popup and set its coordinates
  // based on the feature found.
  popup.setLngLat(coordinates)
      .setHTML(e.features[0].properties.Name)
      .addTo(map);
});

// Change it back to a pointer when it leaves.
map.on('mouseleave', 'Þörungar', function () {
    map.getCanvas().style.cursor = '';
    popup.remove();
});

  // Hross

  map.addSource('hross', {
      type: 'vector',
      url: 'mapbox://dagsson.cjl83lx2w02oo31pbmccnrd9g-1ddsc'
  });
  map.addLayer({
      'id': 'Hestar',
      'icon': '',
      'type': 'circle',
      'source': 'hross',
      'layout': {
          'visibility': 'none'
      },
      'paint': {
          'circle-radius': {
              'base': 2,
              'stops': [[3, 3], [16, 32]]
          },
          'circle-color': '#A57D28'
      },
      'source-layer': 'hross_ag2018'
  });
  map.on('click', 'Hestar', function (e) {
      var clickedPoint = e.features[0];
      flyToStore(clickedPoint);
  });

  // Change the cursor to a pointer when the mouse is over the states layer.
 map.on('mouseenter', 'Hestar', function (e) {
  map.getCanvas().style.cursor = 'pointer';
  var coordinates = e.features[0].geometry.coordinates.slice();

  // Ensure that if the map is zoomed out such that multiple
  // copies of the feature are visible, the popup appears
  // over the copy being pointed to.
  while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
  }

  // Populate the popup and set its coordinates
  // based on the feature found.
  popup.setLngLat(coordinates)
      .setHTML(e.features[0].properties.Name)
      .addTo(map);
});

// Change it back to a pointer when it leaves.
map.on('mouseleave', 'Hestar', function () {
    map.getCanvas().style.cursor = '';
    popup.remove();
});

  // Fiskeldi

  map.addSource('fiskeldi', {
      type: 'vector',
      url: 'mapbox://dagsson.cjl83gvwh0iwe2vrui3axviv4-9jo3e'
  });
  map.addLayer({
      'id': 'Fiskeldi',
      'icon': '',
      'type': 'circle',
      'source': 'fiskeldi',
      'layout': {
          'visibility': 'none'
      },
      'paint': {
          'circle-radius': {
              'base': 2,
              'stops': [[3, 3], [16, 32]]
          },
          'circle-color': '#dea613'
      },
      'source-layer': 'fiskeldi_ag2018'
  });
  map.on('click', 'Fiskeldi', function (e) {
      var clickedPoint = e.features[0];
      flyToStore(clickedPoint);
  });

  // Change the cursor to a pointer when the mouse is over the states layer.
 map.on('mouseenter', 'Fiskeldi', function (e) {
  map.getCanvas().style.cursor = 'pointer';
  var coordinates = e.features[0].geometry.coordinates.slice();

  // Ensure that if the map is zoomed out such that multiple
  // copies of the feature are visible, the popup appears
  // over the copy being pointed to.
  while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
  }

  // Populate the popup and set its coordinates
  // based on the feature found.
  popup.setLngLat(coordinates)
      .setHTML(e.features[0].properties.Name)
      .addTo(map);
});

// Change it back to a pointer when it leaves.
map.on('mouseleave', 'Fiskeldi', function () {
    map.getCanvas().style.cursor = '';
    popup.remove();
});

  // Alifuglar

  map.addSource('alifuglar', {
      type: 'vector',
      url: 'mapbox://dagsson.cjl83eiez0ivr2vrusczd8v9r-890x1'
  });
  map.addLayer({
      'id': 'Alifuglar',
      'icon': '',
      'type': 'circle',
      'source': 'alifuglar',
      'layout': {
          'visibility': 'none'
      },
      'paint': {
          'circle-radius': {
              'base': 2,
              'stops': [[3, 3], [16, 32]]
          },
          'circle-color': '#b1200f'
      },
      'source-layer': 'alifuglar_ag2018'
  });
  map.on('click', 'Alifuglar', function (e) {
      var clickedPoint = e.features[0];
      flyToStore(clickedPoint);
  });

  // Change the cursor to a pointer when the mouse is over the states layer.
 map.on('mouseenter', 'Alifuglar', function (e) {
  map.getCanvas().style.cursor = 'pointer';
  var coordinates = e.features[0].geometry.coordinates.slice();

  // Ensure that if the map is zoomed out such that multiple
  // copies of the feature are visible, the popup appears
  // over the copy being pointed to.
  while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
  }

  // Populate the popup and set its coordinates
  // based on the feature found.
  popup.setLngLat(coordinates)
      .setHTML(e.features[0].properties.Name)
      .addTo(map);
});

// Change it back to a pointer when it leaves.
map.on('mouseleave', 'Alifuglar', function () {
    map.getCanvas().style.cursor = '';
    popup.remove();
});

  // Skip

  map.addSource('skip', {
      type: 'vector',
      url: 'mapbox://dagsson.cjl8568s70jg12vlgnxyw0p9g-27p4q'
  });
  map.addLayer({
      'id': 'Afli',
      'icon': '',
      'type': 'circle',
      'source': 'skip',
      'layout': {
          'visibility': 'none'
      },
      'paint': {
          'circle-radius': {
              'base': 2,
              'stops': [[3, 3], [16, 32]]
          },
          'circle-color': '#fa482e'
      },
      'source-layer': 'skip_ag2018'
  });
  map.on('click', 'Afli', function (e) {
      var clickedPoint = e.features[0];
      flyToStore(clickedPoint);
  });

// Change the cursor to a pointer when the mouse is over the states layer.
map.on('mouseenter', 'Afli', function (e) {
  map.getCanvas().style.cursor = 'pointer';
  var coordinates = e.features[0].geometry.coordinates.slice();

  // Ensure that if the map is zoomed out such that multiple
  // copies of the feature are visible, the popup appears
  // over the copy being pointed to.
  while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
  }

  // Populate the popup and set its coordinates
  // based on the feature found.
  popup.setLngLat(coordinates)
      .setHTML(e.features[0].properties.Name)
      .addTo(map);
});

// Change it back to a pointer when it leaves.
map.on('mouseleave', 'Afli', function () {
    map.getCanvas().style.cursor = '';
    popup.remove();
});

  // Geitur

  map.addSource('geitur', {
      type: 'vector',
      url: 'mapbox://dagsson.cjl83jmld0j6m2vqkzr56ngw5-8w1w7'
  });
  map.addLayer({
      'id': 'Geitur',
      'icon': '',
      'type': 'circle',
      'source': 'geitur',
      'layout': {
          'visibility': 'none'
      },
      'paint': {
          'circle-radius': {
              'base': 2,
              'stops': [[3, 3], [16, 32]]
          },
          'circle-color': '#f4a32e'
      },
      'source-layer': 'geitur_ag2018'
  });
  map.on('click', 'Geitur', function (e) {
      var clickedPoint = e.features[0];
      flyToStore(clickedPoint);
  });

  // Change the cursor to a pointer when the mouse is over the states layer.
 map.on('mouseenter', 'Geitur', function (e) {
  map.getCanvas().style.cursor = 'pointer';
  var coordinates = e.features[0].geometry.coordinates.slice();

  // Ensure that if the map is zoomed out such that multiple
  // copies of the feature are visible, the popup appears
  // over the copy being pointed to.
  while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
  }

  // Populate the popup and set its coordinates
  // based on the feature found.
  popup.setLngLat(coordinates)
      .setHTML(e.features[0].properties.Name)
      .addTo(map);
});

// Change it back to a pointer when it leaves.
map.on('mouseleave', 'Geitur', function () {
    map.getCanvas().style.cursor = '';
    popup.remove();
});

  // Matjurtir

  map.addSource('matjurtir', {
      type: 'vector',
      url: 'mapbox://dagsson.cjl848pqj0j0s2ql3t6s5ukg4-9ct42'
  });
  map.addLayer({
      'id': 'Matjurtir',
      'icon': '',
      'type': 'circle',
      'source': 'matjurtir',
      'layout': {
          'visibility': 'none'
      },
      'paint': {
          'circle-radius': {
              'base': 2,
              'stops': [[3, 3], [16, 32]]
          },
          'circle-color': '#80cdc1'
      },
      'source-layer': 'matjurtir_ag2018'
  });
  map.on('click', 'Matjurtir', function (e) {
      var clickedPoint = e.features[0];
      flyToStore(clickedPoint);
  });

  // Change the cursor to a pointer when the mouse is over the states layer.
 map.on('mouseenter', 'Matjurtir', function (e) {
  map.getCanvas().style.cursor = 'pointer';
  var coordinates = e.features[0].geometry.coordinates.slice();

  // Ensure that if the map is zoomed out such that multiple
  // copies of the feature are visible, the popup appears
  // over the copy being pointed to.
  while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
  }

  // Populate the popup and set its coordinates
  // based on the feature found.
  popup.setLngLat(coordinates)
      .setHTML(e.features[0].properties.Name)
      .addTo(map);
});

// Change it back to a pointer when it leaves.
map.on('mouseleave', 'Matjurtir', function () {
    map.getCanvas().style.cursor = '';
    popup.remove();
});


  // Svin

  map.addSource('svin', {
      type: 'vector',
      url: 'mapbox://dagsson.cjl865kyd0jc72qqknchl205x-6brmo'
  });
  var svin = map.addLayer({
      'id': 'Svín',
      'icon': '../assets/img/010-animals-2.png',
      'type': 'circle',
      'source': 'svin',
      'layout': {
          'visibility': 'none'
      },
      'paint': {
          'circle-radius': {
              'base': 2,
              'stops': [[3, 3], [16, 32]]
          },
          'circle-color': '#35978f'
      },
      'source-layer': 'svin_ag2018'
  });
  map.on('click', 'Svín', function (e) {
      var clickedPoint = e.features[0];
      flyToStore(clickedPoint);
      console.log(svin);
  });

  // Change the cursor to a pointer when the mouse is over the states layer.
  map.on('mouseenter', 'Svín', function (e) {
      map.getCanvas().style.cursor = 'pointer';
      var coordinates = e.features[0].geometry.coordinates.slice();

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      // Populate the popup and set its coordinates
      // based on the feature found.
      popup.setLngLat(coordinates)
          .setHTML(e.features[0].properties.Name)
          .addTo(map);
  });

  // Change it back to a pointer when it leaves.
  map.on('mouseleave', 'Svín', function () {
      map.getCanvas().style.cursor = '';
      popup.remove();
  });

  // Skelfiskur

  map.addSource('skelfiskur', {
      type: 'vector',
      url: 'mapbox://dagsson.cjl84n8gn0iwv32piimp4c3y8-5j5mq'
  });
  map.addLayer({
      'id': 'Skelfiskur',
      'icon': '',
      'type': 'circle',
      'source': 'skelfiskur',
      'layout': {
          'visibility': 'none'
      },
      'paint': {
          'circle-radius': {
              'base': 2,
              'stops': [[3, 3], [16, 32]]
          },
          'circle-color': '#01665e'
      },
      'source-layer': 'skelfiskur_ag2018'
  });
  map.on('click', 'Skelfiskur', function (e) {
      var clickedPoint = e.features[0];
      flyToStore(clickedPoint);
  });

  // Change the cursor to a pointer when the mouse is over the states layer.
  map.on('mouseenter', 'Skelfiskur', function (e) {
      map.getCanvas().style.cursor = 'pointer';
      var coordinates = e.features[0].geometry.coordinates.slice();

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      // Populate the popup and set its coordinates
      // based on the feature found.
      popup.setLngLat(coordinates)
          .setHTML(e.features[0].properties.Name)
          .addTo(map);
  });

  // Change it back to a pointer when it leaves.
  map.on('mouseleave', 'Skelfiskur', function () {
      map.getCanvas().style.cursor = '';
      popup.remove();
  });

var tabImg = [ '../assets/img/011-animals.png', '../assets/img/007-animals-5.png', '../assets/img/003-sea.png', '../assets/img/009-animals-3.png', '../assets/img/006-food-1.png', '../assets/img/008-animals-4.png', '../assets/img/001-transport.png', '../assets/img/002-animals-1.png', '../assets/img/004-nature.png', '../assets/img/010-animals-2.png', '../assets/img/005-food.png'];
var toggleableLayerIds = [ 'Nautgripir', 'Sauðfé', 'Þörungar', 'Hestar', 'Fiskeldi', 'Alifuglar', 'Afli', 'Geitur', 'Matjurtir', 'Svín', 'Skelfiskur' ];


for (var i = 0; i < toggleableLayerIds.length; i++) {
    var id = toggleableLayerIds[i];
    var menu = document.getElementById('menu');
    var item = menu.appendChild(document.createElement('div'));
    item.id = 'listing-' + i;
    var foodicon = document.createElement('img');
    item.appendChild(foodicon);
    var link = item.appendChild(document.createElement('div'));
    link.className = 'item';
    
    link.textContent = id;
    
    link.style.color = "black";
    //link.style.backgroundColor = "white";
    //link.style.padding = "15px";
    link.style.fontFamily = "Source Sans Pro";
    //link.style.width = '90px';
    foodicon.setAttribute( 'src', tabImg[i]);
    foodicon.style.height = "25px";
    foodicon.style.margin = "10px auto 0px";
    foodicon.style.opacity = "0.3";
    
    
    item.onclick = function (e) {  
      var clickedLayer = this.textContent;
        e.preventDefault();
        e.stopPropagation();
        var bgColor = map.getPaintProperty(clickedLayer, 'circle-color');
        var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

        if (visibility === 'none') {
            this.className = 'pp-tab';
            map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
            this.style.color = "white";
            this.style.backgroundColor = bgColor;           
        } else {
            this.className = 'pp-tab active';
            map.setLayoutProperty(clickedLayer, 'visibility', 'none');
            this.style.color = "black";
            this.style.borderColor = "lightgray";
            this.style.backgroundColor = "white";
        }
    };
    
    document.getElementById('menu').appendChild(item);  
}

})
  }
}
