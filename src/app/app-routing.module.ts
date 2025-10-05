import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRideComponent } from './components/add-ride/add-ride.component';
import { RideListComponent } from './components/ride-list/ride-list.component';
import { RideSearchComponent } from './components/ride-search/ride-search.component';

const routes: Routes = [
  { path: '', redirectTo: 'ride-list', pathMatch: 'full' },
  { path: 'add-ride', component: AddRideComponent },
  { path: 'ride-list', component: RideListComponent },
  { path: 'ride-search', component: RideSearchComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
