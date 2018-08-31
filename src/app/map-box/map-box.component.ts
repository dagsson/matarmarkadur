import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MapService } from '../map.service';
import { GeoJson, FeatureCollection } from '../map';
import { FARMS } from '../mock-farms';

@Component({
  selector: 'app-map-box',
  templateUrl: './map-box.component.html',
  styleUrls: ['./map-box.component.css']
})
export class MapBoxComponent implements OnInit {

  map: mapboxgl.Map;
  style = 'mapbox://styles/dagsson/cjlf8cgng2ma92qudfeqd8yjp';
  lat = 65.800009;
  lng = -19.018391;

  // data
  source: any;
  markers: any;

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
      zoom: 7.8,
      center: [this.lng, this.lat]
    });

    var popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    });

    map.on('load', (event) => {
      map.addLayer({
        id: 'locations',
        type: 'symbol',
        source: {
          type: 'geojson',
          data: FARMS
        },
        layout: {
          'icon-image': 'restaurant-15',
          'icon-allow-overlap': true
      }
      });

      

      buildLocationList(FARMS);

      function buildLocationList(data) {
        for (var i = 0; i < data.features.length; i++) {
          var currentFeature = data.features[i];
          var prop = currentFeature.properties;
          var listings = document.getElementById('listings');
          var listing = listings.appendChild(document.createElement('div'));
          listing.className = 'item';
          listing.id = 'listing-' + i;
          var link = listing.appendChild(document.createElement('a'));
          link.href = '#';
          link.className = 'title';
          link.dataPosition = i;
          link.innerHTML = prop.id;
          var details = listing.appendChild(document.createElement('div'));
          details.innerHTML = prop.address;
          link.addEventListener('click', function(e) {
            // Update the currentFeature to the store associated with the clicked link
            var clickedListing = data.features[this.dataPosition];
            // 1. Fly to the point associated with the clicked link
            flyToStore(clickedListing);
            // 2. Close all other popups and display popup for clicked store
            createPopUp(clickedListing);
            // 3. Highlight listing in sidebar (and remove highlight for all other listings)
            var activeItem = document.getElementsByClassName('active');
            if (activeItem[0]) {
              activeItem[0].classList.remove('active');
            }
            this.parentNode.classList.add('active');
          });
        }
      }

      

      function flyToStore(currentFeature) {
        map.flyTo({
          center: currentFeature.geometry.coordinates,
          zoom: 8
        });
      }
      
      function createPopUp(currentFeature) {
        var popUps = document.getElementsByClassName('mapboxgl-popup');
        // Check if there is already a popup on the map and if so, remove it
        if (popUps[0]) popUps[0].remove();
      
        var popup = new mapboxgl.Popup({ closeOnClick: false })
          .setLngLat(currentFeature.geometry.coordinates)
          .setHTML('<h3>Framleiðandi</h3>' +
            '<h4>' + currentFeature.properties.address + '</h4>')
          .addTo(map);
      }

      map.on('click', function(e) {
        // Query all the rendered points in the view
        var features = map.queryRenderedFeatures(e.point, { layers: ['locations'] });
        if (features.length) {
          var clickedPoint = features[0];
          // 1. Fly to the point
          flyToStore(clickedPoint);
          // 2. Close all other popups and display popup for clicked store
          createPopUp(clickedPoint);
          // 3. Highlight listing in sidebar (and remove highlight for all other listings)
          var activeItem = document.getElementsByClassName('active');
          if (activeItem[0]) {
            activeItem[0].classList.remove('active');
          }
          // Find the index of the store.features that corresponds to the clickedPoint that fired the event listener
          var selectedFeature = clickedPoint.properties.address;
      
          for (var i = 0; i < FARMS.features.length; i++) {
            if (FARMS.features[i].properties.address === selectedFeature) {
              selectedFeatureIndex = i;
            }
          }
          // Select the correct list item using the found index and add the active class
          var listing = document.getElementById('listing-' + selectedFeatureIndex);
          listing.classList.add('active');
        }
      });
      

     }

     

  )};

}
