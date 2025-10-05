import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'; // <-- Add this import
import { RideSearchComponent } from './ride-search.component';
import { RideService } from 'src/app/services/ride.service';
import { Ride } from 'src/app/models/ride.model';

describe('RideSearchComponent', () => {
  let component: RideSearchComponent;
  let fixture: ComponentFixture<RideSearchComponent>;
  let rideService: RideService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RideSearchComponent],
      providers: [RideService],
      imports: [FormsModule] // <-- Add this line
    }).compileComponents();

    fixture = TestBed.createComponent(RideSearchComponent);
    component = fixture.componentInstance;
    rideService = TestBed.inject(RideService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search rides by vehicle type', () => {
    component.vehicleType = 'Car';
    component.search();
    expect(component.rides.every(r => r.vehicleType === 'Car')).toBeTrue();
  });

  it('should return rides within +/- 60 minutes buffer', () => {
    const baseTime = new Date();
    const testRide: Ride = {
      rideId: 99,
      employeeId: 'E500',
      vehicleType: 'Bike',
      vehicleNo: 'ZZ123',
      vacantSeats: 1,
      time: new Date(baseTime.getTime() + 30 * 60000).toISOString(), // 30 mins later
      pickupPoint: 'P',
      destination: 'Q',
      bookedEmployeeIds: []
    };
    rideService.addRide(testRide);
    component.searchTime = baseTime.toISOString();
    component.search();
    expect(component.rides.some(r => r.rideId === 99)).toBeTrue();
  });

  it('should not include rides outside 60 min buffer', () => {
    const baseTime = new Date();
    const testRide: Ride = {
      rideId: 100,
      employeeId: 'E600',
      vehicleType: 'Car',
      vehicleNo: 'CC456',
      vacantSeats: 2,
      time: new Date(baseTime.getTime() + 3 * 60 * 60000).toISOString(), // 3 hours later
      pickupPoint: 'A',
      destination: 'B',
      bookedEmployeeIds: []
    };
    rideService.addRide(testRide);
    component.searchTime = baseTime.toISOString();
    component.search();
    expect(component.rides.some(r => r.rideId === 100)).toBeFalse();
  });
});
