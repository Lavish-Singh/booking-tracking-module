import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { } from 'googlemaps';
@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit {
  @ViewChild('mapContainer', {}) gmap: ElementRef;
  public bookingTravelcounter = 0;
  public bookingTravelledPath;
  public bookingTravlledCoordinates = [];
  public bookingCoordinates;
  public bookingPath;
  public startEndMarker;
  public labels = 'SD';
  public labelIndex = 0;
  public carImageMarker;
  public marker;

  map: google.maps.Map;
  lat = 30.7139;
  lng = 76.7024;

  center = new google.maps.LatLng(this.lat, this.lng);

  mapOptions: google.maps.MapOptions = {
    center: this.center,
    zoom: 17
  };
  // =============================== Map initializing function ================================ //
  initMap() {
    this.map = new google.maps.Map(this.gmap.nativeElement,
    this.mapOptions);

    // ============================ Set of lat lng for path ==================== //
    this.bookingCoordinates = [
      { lat: 30.7129, lng: 76.7093 },
      { lat: 30.7130, lng: 76.7086 },
      { lat: 30.7131, lng: 76.7080 },
      { lat: 30.7132, lng: 76.7074 },
      { lat: 30.7133, lng: 76.7068 },
      { lat: 30.7134, lng: 76.7061 },
      { lat: 30.7135, lng: 76.7054 },
      { lat: 30.7136, lng: 76.7048 },
      { lat: 30.7137, lng: 76.7042 },
      { lat: 30.7138, lng: 76.7036 },
      { lat: 30.7139, lng: 76.7024 },
      { lat: 30.7140, lng: 76.7018 },
      { lat: 30.7141, lng: 76.7016 },
      { lat: 30.7142, lng: 76.7014 },
      { lat: 30.7143, lng: 76.7011 },
      { lat: 30.7142, lng: 76.7008 },
      { lat: 30.7141, lng: 76.7004 },
      { lat: 30.7138, lng: 76.7000 },
      { lat: 30.7137, lng: 76.6997 },
      { lat: 30.7136, lng: 76.6993 },
      { lat: 30.7135, lng: 76.6990 },
    ];

    // ============================== Drawing booking path ==================== //
    this.bookingPath = new google.maps.Polyline({
      path: this.bookingCoordinates,
      geodesic: true,
      strokeColor: '#000000',
      strokeOpacity: 0.5,
      strokeWeight: 5
    });
    this.bookingPath.setMap(this.map);

    // ============================= Placing Source Destination Marker ============ //
    this.startEndMarker = [
      { position: new google.maps.LatLng(30.7135, 76.6990) },
      { position: new google.maps.LatLng(30.7129, 76.7093) }
    ];

    for (let i = 0; i < this.startEndMarker.length; i++) {
      this.marker = new google.maps.Marker({
        position: this.startEndMarker[i].position,
        label: this.labels[this.labelIndex++ % this.labels.length],
        map: this.map
      });
    }

    // ============================ Placing vehicle marker at initial position ===== //
    this.carImageMarker = new google.maps.Marker({
      position: this.startEndMarker[0].position,
      icon: '../../assets/car.png',
      map: this.map
    });

    setInterval(() => {
      this.changeMarkerPosition(this.carImageMarker);
    }, 2000);
  }

  // ========================================= Vehicle Marker Movement Function ======================================== //
  changeMarkerPosition(carImageMarker) {
    this.bookingTravelcounter++;
    for (let j = this.bookingCoordinates.length - this.bookingTravelcounter; j >= 0; j--) {
      const latlng = new google.maps.LatLng(this.bookingCoordinates[j].lat, this.bookingCoordinates[j].lng);

      // ================================== Moving vehicle according to updated lat lng ================================ //
      carImageMarker.setPosition(latlng);
      this.bookingTravlledCoordinates.push({
        lat: this.bookingCoordinates[j].lat,
        lng: this.bookingCoordinates[j].lng
      });

      // ================================== Showing path travelled by vehicle ======================================= //
      this.bookingTravelledPath = new google.maps.Polyline({
        path: this.bookingTravlledCoordinates,
        geodesic: true,
        strokeColor: '#000000',
        strokeOpacity: 1.0,
        strokeWeight: 5
      });
      this.bookingTravelledPath.setMap(this.map);
      break;
    }
  }

  ngOnInit() {
    this.initMap();
  }

}
