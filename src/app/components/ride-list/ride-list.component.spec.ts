import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { RideListComponent } from './ride-list.component';
import { RideService } from 'src/app/services/ride.service';
import { Ride } from 'src/app/models/ride.model';

describe('RideListComponent', () => {
  let component: RideListComponent;
  let fixture: ComponentFixture<RideListComponent>;
  let rideService: RideService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RideListComponent],
      providers: [RideService],
      imports: [FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(RideListComponent);
    component = fixture.componentInstance;
    rideService = TestBed.inject(RideService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter rides by vehicle type', () => {
    component.filterRides('', 'Car');
    expect(component.filteredRides.every(r => r.vehicleType === 'Car')).toBeTrue();
  });

  it('should filter rides within 60 minutes of given time', () => {
    const baseTime = new Date();
    const testRide: Ride = {
      rideId: 200,
      employeeId: 'E700',
      vehicleType: 'Car',
      vehicleNo: 'CAR123',
      vacantSeats: 1,
      time: new Date(baseTime.getTime() + 30 * 60000).toISOString(),
      pickupPoint: 'X',
      destination: 'Y',
      bookedEmployeeIds: []
    };
    rideService.addRide(testRide);
    component.filterRides(baseTime.toISOString(), '');
    expect(component.filteredRides.some(r => r.rideId === 200)).toBeTrue();
  });

  it('should not allow employee to book own ride', () => {
    spyOn(window, 'alert');
    const ride = rideService.searchRides()[0];
    component.bookRide(ride, ride.employeeId);
    expect(window.alert).toHaveBeenCalledWith('You cannot book your own ride!');
  });

  it('should not allow booking same ride twice', () => {
    spyOn(window, 'alert');
    const ride = rideService.searchRides()[0];
    const empId = 'E888';
    component.bookRide(ride, empId); // first booking
    component.bookRide(ride, empId); // second booking
    expect(window.alert).toHaveBeenCalledWith('You cannot book the same ride twice!');
  });

  it('should show success alert when ride booked successfully', () => {
    spyOn(window, 'alert');
    const ride = rideService.searchRides()[0];
    component.bookRide(ride, 'E999');
    expect(window.alert).toHaveBeenCalledWith('Ride booked successfully!');
  });
});
