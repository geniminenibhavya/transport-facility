import { Component } from '@angular/core';
import { Ride } from 'src/app/models/ride.model';
import { RideService } from 'src/app/services/ride.service';

@Component({
  selector: 'app-add-ride',
  templateUrl: './add-ride.component.html',
  styleUrls: ['./add-ride.component.css']
})
export class AddRideComponent {
  rides: Ride[] = [];
  ride: Ride = {
    rideId: 0,
    employeeId: '',
    vehicleType: 'Car',
    vehicleNo: '',
    vacantSeats: 1,
    time: new Date().toISOString(),
    pickupPoint: '',
    destination: '',
    bookedEmployeeIds: []
  };

  constructor(private rideService: RideService) { }

  addRide() {
    if (!this.ride.employeeId || !this.ride.vehicleType || !this.ride.vehicleNo ||
      !this.ride.vacantSeats || !this.ride.time || !this.ride.pickupPoint || !this.ride.destination) {
      alert('All fields are mandatory!');
      return;
    }
    const today = new Date().toISOString().slice(0, 10);
    if (!this.ride.time.startsWith(today)) {
      alert('You can only add rides for today!');
      return;
    }

    // Get all rides from the service
    const allRides = this.rideService['rides']; // Access private rides array directly or create a getter in the service

    const isDuplicateForToday = allRides.some(r =>
      r.employeeId === this.ride.employeeId &&
      r.time.startsWith(today)
    );

    if (isDuplicateForToday) {
      alert('This employee has already added a ride for today!');
      return;
    }

    const nextId = allRides.length ? Math.max(...allRides.map(r => r.rideId)) + 1 : 1;
    const newRide: Ride = { ...this.ride, rideId: nextId, bookedEmployeeIds: [] };
    this.rideService.addRide(newRide);
    alert('Ride added successfully!');
  }
}
