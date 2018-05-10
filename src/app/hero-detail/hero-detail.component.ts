import { Component, OnInit, Input } from '@angular/core'; // <-- needed to add Input because it receivesfrom it's bound HTML selector

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../hero.service';

import { Hero } from '../hero';

@Component({
  selector: 'app-hero-detail', // <-- this will have a attribute 'hero' bound to 'selectedHero'
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

     // this is decorated with @Input so it can receive what's coming in.
    @Input() hero: Hero;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location) {
  }

  ngOnInit() {
      this.getHero();
  }


    getHero(): void {
        // The JavaScript (+) operator converts the string to a number,
        const id = +this.route.snapshot.paramMap.get('id');
        this.heroService.getHero(id).subscribe(x => this.hero = x);
}

    goBack(): void {
        this.location.back();
    }

    // call the updateHero from the serivce and then when it responses, click GO Back.
    save(): void {
        this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
    }
}
