import { TestBed } from '@angular/core/testing';

import { RideService } from './ride.service';
import { Ride } from '../models/ride.model';

describe('RideService', () => {
 let service: RideService;

  beforeEach(() => { TestBed.configureTestingModule({}); service = TestBed.inject(RideService); }); it('should be created', () => { expect(service).toBeTruthy(); }); it('should initialize with sample ride', (done) => { service.rides$.subscribe(rides => { expect(rides.length).toBeGreaterThan(0); expect(rides[0].employeeId).toBe('E001'); done(); }); }); it('should add a new ride', (done) => { const newRide: Ride = { rideId: 2, employeeId: 'E002', vehicleType: 'Bike', vehicleNo: 'XY9876', vacantSeats: 1, time: new Date().toISOString(), pickupPoint: 'C', destination: 'D', bookedEmployeeIds: [] }; service.addRide(newRide); service.rides$.subscribe(rides => { expect(rides.find(r => r.rideId === 2)).toBeTruthy(); done(); }); }); it('should allow booking a ride if seats available and not already booked', () => { const ride = service.searchRides()[0]; const success = service.bookRide('E010', ride); expect(success).toBeTrue(); expect(ride.vacantSeats).toBe(2); expect(ride.bookedEmployeeIds).toContain('E010'); }); it('should not allow booking if the same employee already booked', () => { const ride = service.searchRides()[0]; const empId = 'E020'; // First booking
   const firstBooking = service.bookRide(empId, ride); expect(firstBooking).toBeTrue(); // Second booking (duplicate) 
   const secondBooking = service.bookRide(empId, ride); expect(secondBooking).toBeFalse(); }); it('should not allow booking if employee is the ride owner', () => { const ride = service.searchRides()[0]; const ownerId = ride.employeeId; const booking = service.bookRide(ownerId, ride); expect(booking).toBeFalse(); }); it('should not allow booking if no vacant seats left', () => { const ride: Ride = { rideId: 3, employeeId: 'E100', vehicleType: 'Car', vehicleNo: 'ZZ9999', vacantSeats: 1, time: new Date().toISOString(), pickupPoint: 'P', destination: 'Q', bookedEmployeeIds: [] }; service.addRide(ride); // First booking (fills the seat) 
   const firstBooking = service.bookRide('E200', ride); expect(firstBooking).toBeTrue(); // Second booking should fail 
   const secondBooking = service.bookRide('E201', ride); expect(secondBooking).toBeFalse(); }); it('should search rides by vehicle type', () => { const rides = service.searchRides('Car'); expect(rides.every(r => r.vehicleType === 'Car')).toBeTrue(); }); it('should return all rides if no vehicleType provided', () => { const rides = service.searchRides(); expect(rides.length).toBeGreaterThan(0); });
});
