import { Component, OnInit } from '@angular/core';

// need hero object and heroservice to do stuff.
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


    heroes: Hero[] = [];

    constructor(private heroService: HeroService) { }

  ngOnInit() {
      this.getHeroes();
  }

    // awaits for results back from service, and takes the top 5, placing them in our local array
    getHeroes(): void {
        this.heroService.getHeroes()
            .subscribe(x => this.heroes = x.slice(1, 5));
  }
}
