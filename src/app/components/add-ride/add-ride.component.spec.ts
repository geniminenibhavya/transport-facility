import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'; // <-- Add this import

import { AddRideComponent } from './add-ride.component';
import { RideService } from 'src/app/services/ride.service';

describe('AddRideComponent', () => {
  let component: AddRideComponent;
  let fixture: ComponentFixture<AddRideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddRideComponent],
      providers: [RideService],
      imports: [FormsModule] // <-- Add this line
    }).compileComponents();

    fixture = TestBed.createComponent(AddRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
