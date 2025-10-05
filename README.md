```markdown
# 🚗 Transport Facility Web Application

This is an Angular web application for employees to schedule, add, and book pick-up/drop-off rides provided by their colleagues within the company.  

The app ensures **same-day rides only**, prevents duplicate bookings, and supports search/filter functionality with buffer time logic.

---

## ✨ Features

- **Add a Ride**
  - Employee can add a ride for **today only**
  - Prevents the same employee from adding multiple rides on the same day
  - Mandatory details: Employee ID, Vehicle Type (Car/Bike), Vehicle No, Vacant Seats, Time, Pickup Point, Destination

- **Book a Ride**
  - Employees can book available rides
  - Vacant seats automatically update
  - Restricts booking:
    - Cannot book own ride
    - Cannot book the same ride twice
    - Cannot book if no seats available

- **Search & Filter**
  - Filter rides by **vehicle type**
  - Filter rides by **time** with a ±60 minutes buffer

---

## 🛠️ Tech Stack

- **Frontend:** Angular 10+ (TypeScript, HTML, CSS)
- **State Management:** RxJS `BehaviorSubject`
- **Testing:** Jasmine & Karma

---

## 📂 Project Structure

```

src/
├── app/
│   ├── components/
│   │   ├── add-ride/          # AddRideComponent
│   │   ├── ride-list/         # RideListComponent
│   │   └── ride-search/       # RideSearchComponent
│   ├── models/
│   │   └── ride.model.ts      # Ride interface
│   └── services/
│       └── ride.service.ts    # RideService with business logic
└── assets/

````

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/transport-facility.git
cd transport-facility
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Application

```bash
ng serve
```

Navigate to: [http://localhost:4200](http://localhost:4200)

---

## 🧪 Running Unit Tests

The project includes unit tests with Jasmine + Karma for:

* `RideService`
* `RideSearchComponent`
* `RideListComponent`

Run tests with:

```bash
ng test
```

---

## ✅ Example Scenarios

* **Add Ride:** Employee `E001` adds a ride at 9:00 AM → visible to others
* **Book Ride:** Employee `E002` books → vacant seats decrease
* **Prevent Duplicate Ride:** Employee `E001` cannot add another ride for the same day
* **Search with Buffer:** Searching for 10:00 AM shows rides between 9:00–11:00 AM

---

## 📌 Notes

* Only **today’s rides** can be added.
* Employee cannot book their own ride.
* Alerts are shown for invalid booking attempts.
* This project is a demonstration of transport scheduling functionality and can be extended for real-world use with a backend.

---

## 👩‍💻 Author

Built with ❤️ using Angular & TypeScript

```
```
