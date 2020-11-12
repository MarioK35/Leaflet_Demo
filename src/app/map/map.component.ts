import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

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

  

var countries = L.geoJson(countries);

this.map = L.map('map').setView([25, -90],6);


const tiles = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
	maxZoom: 20,
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
});

tiles.addTo(this.map)
countries.addTo(this.map)
}
}