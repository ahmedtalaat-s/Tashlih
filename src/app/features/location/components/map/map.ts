import { Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
// import * as mapboxgl from 'mapbox-gl';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { SupplierService } from '../../services/supplier-service';
import { Marker, Popup } from 'mapbox-gl';
@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.html',
  styleUrl: './map.css',
})
export class Map implements OnInit, OnDestroy {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;
  map!: any; // mapboxgl.Map
  marker!: any; // mapboxgl.Marker
  isSelectingLocation = false;
  private platformId = inject(PLATFORM_ID);
  private supplierService = inject(SupplierService);
  private mapboxgl: any; // hold the imported MapboxGL

  async ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // SSR check to ensure this runs in the browser as GL JS requires a browser environment
      this.mapboxgl = (await import('mapbox-gl')).default; // dynamically import mapbox-gl as the default export

      // Create a new map instance
      this.map = new this.mapboxgl.Map({
        accessToken: environment.mapboxToken,
        style: 'mapbox://styles/mapbox/streets-v11',
        container: this.mapContainer.nativeElement, // Reference to the map container element
        center: [46.6753, 24.7136], // Center coordinates for map over the riyahd
        zoom: 10, // Initial zoom level
      });

      this.map.on('click', (event: any) => {
        if (!this.isSelectingLocation) return;
        const lng = event.lngLat.lng;
        const lat = event.lngLat.lat;

        this.setMarker(lng, lat);
        this.getNearestSuppliers(lat, lng);
      });
    }
  }

  enableLocationSelection() {
    this.isSelectingLocation = true;
  }

  //set the marker for clickking on map
  setMarker(lng: number, lat: number) {
    if (this.marker) {
      this.marker.remove();
    }

    this.marker = new this.mapboxgl.Marker({ color: 'red' }).setLngLat([lng, lat]).addTo(this.map);
    this.isSelectingLocation = false;
  }
  //get the nearest suppliers for the clicked location
  getNearestSuppliers(lat: number, lng: number) {
    this.supplierService.getNearestSuppliers(lat, lng).subscribe((suppliers) => {
      this.showSuppliersOnMap(suppliers);
    });
  }
  //show the nearest supplier on map
  showSuppliersOnMap(suppliers: any[]) {
    suppliers.forEach((supplier) => {
      const popup = new this.mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
      }).setHTML(`
        <strong>${supplier.name}</strong><br/>
        ${supplier.address}
      `);

      const marker: Marker = new this.mapboxgl.Marker({ color: 'blue' })
        .setLngLat([supplier.longitude, supplier.latitude])
        .addTo(this.map);

      // 🖱️ Hover → show info
      marker.getElement().addEventListener('mouseenter', () => {
        popup.addTo(this.map).setLngLat([supplier.longitude, supplier.latitude]);
      });
      marker.getElement().addEventListener('mouseleave', () => {
        popup.remove();
      });

      // 🖱️ Click → navigate to supplier page
      marker.getElement().addEventListener('click', () => {
        // this.router.navigate(['/suppliers', supplier.id]);
        console.log(supplier.name);
      });
    });
  }
  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }
}
