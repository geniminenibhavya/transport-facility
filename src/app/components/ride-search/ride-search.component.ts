import { Component, ViewChild } from '@angular/core';
import { Ride } from 'src/app/models/ride.model';
import { RideService } from 'src/app/services/ride.service';

import { RideListComponent } from '../ride-list/ride-list.component';

@Component({
  selector: 'app-ride-search',
  templateUrl: './ride-search.component.html',
  styleUrls: ['./ride-search.component.css']
})

export class RideSearchComponent {
  rides: Ride[] = [];
  vehicleType: string = '';
  searchTime: string = '';

  @ViewChild(RideListComponent)
  rideListComponent!: RideListComponent;

  constructor(private rideService: RideService) {}

  search(): void {
    const selectedDate = new Date(this.searchTime);
    this.rides = this.rideService.searchRides(this.vehicleType).filter(ride => {
      if (!this.searchTime) return true; // If no time selected, show all
      const rideDate = new Date(ride.time);
      const diff = Math.abs(selectedDate.getTime() - rideDate.getTime()) / (1000 * 60); // minutes
      return diff <= 60;
    });
  }

  searchRides(vehicleType: string, time: string) {
    this.rideListComponent.filterRides(time, vehicleType);
  }

  searchByTime(time: string): void {
    const selectedDate = new Date(time);
    this.rides = this.rideService.searchRides(this.vehicleType).filter(ride => {
      const rideDate = new Date(ride.time);
      const diff = Math.abs(selectedDate.getTime() - rideDate.getTime()) / (1000 * 60); // minutes
      return diff <= 60;
    });
  }
}
