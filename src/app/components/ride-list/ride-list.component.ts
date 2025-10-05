import { Component, OnInit } from '@angular/core';
import { Ride } from 'src/app/models/ride.model';
import { RideService } from 'src/app/services/ride.service';

@Component({
  selector: 'app-ride-list',
  templateUrl: './ride-list.component.html',
  styleUrls: ['./ride-list.component.css']
})
export class RideListComponent implements OnInit {
  rides: Ride[] = [];
  filteredRides: Ride[] = [];
  bookingEmployeeId: string = ''; // Add this property
  selectedVehicleType: string = '';
  selectedTime: string = '';

  constructor(private rideService: RideService) {}

  ngOnInit(): void {
    this.rideService.rides$.subscribe((data: Ride[]) => {
      this.rides = data;
      this.filteredRides = [...this.rides]; // Show all rides by default
    });
  }

  filterRides(selectedTime: string, vehicleType: string) {
    let ridesToFilter = this.rides;
    if (vehicleType) {
      ridesToFilter = ridesToFilter.filter(ride =>
        ride.vehicleType.trim().toLowerCase() === vehicleType.trim().toLowerCase()
      );
    }
    if (selectedTime) {
      const selectedDate = new Date(selectedTime);
      ridesToFilter = ridesToFilter.filter(ride => {
        const rideDate = new Date(ride.time);
        const diff = Math.abs(selectedDate.getTime() - rideDate.getTime()) / (1000 * 60);
        return diff <= 60;
      });
    }
    this.filteredRides = ridesToFilter;
  }

  bookRide(ride: Ride, bookingEmployeeId: string) {
    const success = this.rideService.bookRide(bookingEmployeeId, ride);
    if (!success) {
      if (ride.employeeId === bookingEmployeeId) {
        alert('You cannot book your own ride!');
      } else if (ride.bookedEmployeeIds.includes(bookingEmployeeId)) {
        alert('You cannot book the same ride twice!');
      } else if (ride.vacantSeats <= 0) {
        alert('No vacant seats available!');
      }
      return;
    }
    alert('Ride booked successfully!');
  }
}
