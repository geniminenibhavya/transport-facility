import { Injectable } from '@angular/core';
import { Ride } from '../models/ride.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RideService {
private rides: Ride[] = [];
  private ridesSubject = new BehaviorSubject<Ride[]>(this.rides);

  rides$ = this.ridesSubject.asObservable();

  constructor() {
    // Add sample rides for testing
    this.rides.push({
      rideId: 1,
      employeeId: 'E001',
      vehicleType: 'Car',
      vehicleNo: 'AB1234',
      vacantSeats: 3,
      time: '2025-10-04T09:00',
      pickupPoint: 'A',
      destination: 'B',
      bookedEmployeeIds: []
    });
    this.ridesSubject.next(this.rides);
  }

  addRide(ride: Ride): void {
    this.rides.push(ride);
    this.ridesSubject.next(this.rides);
  }

  bookRide(employeeId: string, ride: Ride): boolean {
    if (
      ride.vacantSeats > 0 &&
      !this.hasEmployeeBooked(employeeId, ride)
    ) {
      ride.vacantSeats--;
      ride.bookedEmployeeIds.push(employeeId);
      this.ridesSubject.next(this.rides);
      return true;
    }
    return false;
  }

  private hasEmployeeBooked(employeeId: string, ride: Ride): boolean {
    return ride.employeeId === employeeId || ride.bookedEmployeeIds.includes(employeeId);
  }

  searchRides(vehicleType?: string): Ride[] {
    return this.rides.filter(r =>
      !vehicleType || r.vehicleType === vehicleType
    );
  }
}
