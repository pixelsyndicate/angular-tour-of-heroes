import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- manually added .. NgModel lives here
import { AppComponent } from './app.component'; // <-- my core base page

// enable HTTP services
import { HttpClientModule } from '@angular/common/http';


// the following is because i'm using a fake webapi...
// i installed this module using 'npm install angular-in-memory-web-api --save'
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';


import { HeroSearchComponent } from './hero-search/hero-search.component';

@NgModule({
  declarations: [
    AppComponent,
      HeroesComponent,
      HeroDetailComponent,
    MessagesComponent,
      DashboardComponent,
      HeroSearchComponent // <-- auto-added by CLI
  ],
  imports: [
      BrowserModule,
      FormsModule, // <-- manually added
      AppRoutingModule, // <-- importing this grants RoutingModule (base)
      HttpClientModule,

// The HttpClientInMemoryWebApiModule module intercepts HTTP requests
// and returns simulated server responses.
// Remove it when a real server is ready to receive requests.
HttpClientInMemoryWebApiModule.forRoot(
  InMemoryDataService, { dataEncapsulation: false }
)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
