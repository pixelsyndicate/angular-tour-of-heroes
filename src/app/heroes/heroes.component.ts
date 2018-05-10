import { Component, OnInit } from '@angular/core';

// this is my service that will take over for my mock data transport
import { HeroService } from '../hero.service';

// this is a custom class (apparently don't need the .ts mime-type)
import { Hero } from '../hero';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

    hero: Hero = { id: 1, name: 'Windstorm', timestamp: Date.now() };

    heroes: Hero[]; // this is used to feed the *ngFor loop
    // heroes = HEROES; // deprecated. now getting data injected from a service

    selectedHero: Hero; // originally set as the one I labled Windstorm, but is changed in tmy onSelect() expression

    // to do dependency injection, import (above) and then pass the service type into the constructor
    // the heroService is now a singleton instance of HeroService
    constructor(private heroService: HeroService) { }
    // constructor() { }

    ngOnInit() {
        this.getHeroes();
    }

    // this passes the parameter to the selectedHero
    onSelect(hero: Hero): void {
      this.selectedHero = hero;
    }

    // create a function that uses the service to get heros
    //    getHeroes(): void {
    //        this.heroes = this.heroService.getHeroes();
    //    }

    getHeroes(): void {
        this.heroService.getHeroes().subscribe(x => this.heroes = x);
    }

    add(name: string): void {
      name = name.trim();
      if (!name) { return; }

        this.heroService.addHero({ name } as Hero)
        .subscribe(hero => {
          this.heroes.push(hero);
    });
}

delete(hero: Hero): void {
  this.heroes = this.heroes.filter(h => h !== hero);
  this.heroService.deleteHero(hero).subscribe();
}
}
