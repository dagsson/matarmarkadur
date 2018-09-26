import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MapService } from '../map.service';
import { GeoJson, FeatureCollection } from '../map';
import { FARMS } from '../mock-farms';
import {Router} from "@angular/router";

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
  dataPosition: any;

  constructor(private mapService: MapService, private router: Router) { 
  }

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

    var i = 0;
    var j = 1

    var router = this.router;

    map.on('load', (event) => {
      map.addSource('farms', {
        type: 'geojson',
        data: FARMS
      });
  });

      map.scrollZoom.disable();

      FARMS.features.forEach(function(marker) {
        var el = document.createElement('div');
        el.className = 'marker';
        el.innerHTML = "" + j++;
        new mapboxgl.Marker(el, { offset: [0, -23] })
          .setLngLat(marker.geometry.coordinates)
          .addTo(map);
          
          el.addEventListener('click', function(e) {
            var activeItem = document.getElementsByClassName('active');
            // 1. Fly to the point
            flyToStore(marker);
            // 2. Close all other popups and display popup for clicked store
            createPopUp(marker);
            // 3. Highlight listing in sidebar (and remove highlight for all other listings)
            e.stopPropagation();
            if (activeItem[0]) {
              activeItem[0].classList.remove('active');
            }
            var listing = document.getElementById('listing-' + i);
            listing.classList.add('active');
          });
      });

      buildLocationList(FARMS);

      function buildLocationList(data) {
        j = 1;
        for (var i = 0; i < data.features.length; i++) {
          var currentFeature = data.features[i];
          var prop = currentFeature.properties;
          var listings = document.getElementById('listings');
          var listing = listings.appendChild(document.createElement('div'));
          listing.className = 'item';
          listing.id = 'listing-' + i;
          var link = listing.appendChild(document.createElement('a'));
          link.className = 'title';
          link["dataPosition"] = i;
          link.innerHTML = j++ + '. ' + prop.name;
          var details = listing.appendChild(document.createElement('div'));
          details.innerHTML = prop.address;
          link.addEventListener('click', function(e) {
            var clickedListing = data.features[this["dataPosition"]];
            flyToStore(clickedListing);
            createPopUp(clickedListing);
            var activeItem = document.getElementsByClassName('active');
            if (activeItem[0]) {
              activeItem[0].classList.remove('active');
            }
            this.parentNode["classList"].add('active');       
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
        if (popUps[0]) popUps[0].remove();
        var popup = new mapboxgl.Popup({ closeOnClick: false })
          .setLngLat(currentFeature.geometry.coordinates)
          .setHTML('<h3>' + currentFeature.properties.name + '</h3>' +
            '<h4 class="product">' + currentFeature.properties.products + '</h4>' +
            '<h4>' + currentFeature.properties.address + '</h4>' +
            '<div id="panta">Skoða framleiðanda</div>'
          )
          .addTo(map);
          var order = document.getElementById('panta');    
          order.addEventListener('click', function(e) {
            router.navigate(['/farm/' + currentFeature.properties.id + '']);
          });
      }
    }     
  }

