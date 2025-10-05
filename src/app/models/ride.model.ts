export interface Ride {
  rideId: number;
  employeeId: string; // Unique for ride creator
  vehicleType: 'Bike' | 'Car';
  vehicleNo: string;
  vacantSeats: number;
  time: string; // ISO string or HH:mm
  pickupPoint: string;
  destination: string;
  bookedEmployeeIds: string[]; // Track who booked this ride
}