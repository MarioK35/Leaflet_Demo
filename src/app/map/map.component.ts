import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

//json***********************

import {statesData} from './js/us-states'
import {mexData} from './js/mex-states'
import {mexMunicipiosData} from './js/mex-municipios'
import {countiesData} from './js/us-counties'
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
private map;
private est;

  constructor() { }

 ngAfterViewInit():void{
   this.initMap();
 }
 
private initMap():void{
  function getColor(d) {
    return d > 1000 ? '#800026' :
           d > 500  ? '#BD0026' :
           d > 200  ? '#E31A1C' :
           d > 100  ? '#FC4E2A' :
           d > 50   ? '#FD8D3C' :
           d > 20   ? '#FEB24C' :
           d > 10   ? '#FED976' :
                      '#FFEDA0';
}
  
function style(feature) {
  return {
      fillColor: getColor(feature.properties.density),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
  };
}


function popup(feature, layer) { 
  if (feature.properties && feature.properties.name) 
  { 
  layer.bindPopup("<h2>Name: "+feature.properties.name+ "</h2>"+"<h2>Density: "+feature.properties.density+ "</h2>"); 
  } 
  }
  function popupMX(feature, layer) { 
    if (feature.properties && feature.properties.mun_name) 
    { 
    layer.bindPopup("<h2>Name: "+feature.properties.mun_name); 
    } 
    }

this.map = L.map('map').setView([25, -90],6);

const tiles = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
	maxZoom: 20,
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
});

L.geoJson(countiesData).addTo(this.map);
L.geoJson(mexMunicipiosData,{onEachFeature: popupMX }).addTo(this.map);
L.geoJson(statesData, {style: style, onEachFeature: popup }).addTo(this.map);
tiles.addTo(this.map)
}
}