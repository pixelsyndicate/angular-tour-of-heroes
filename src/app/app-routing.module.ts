import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// need to import this so I can add a reference to it.
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

// path " string that matches url" , component = "component to be reated when navigating"
const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'detail/:id', component: HeroDetailComponent },
    { path: 'heroes', component: HeroesComponent }
];


@NgModule({
    exports: [ RouterModule ], // <-- by exporting this, AppModule can use <Router-Outlet>
    imports: [ RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
