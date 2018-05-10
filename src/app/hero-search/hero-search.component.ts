import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';


@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {


  heroes$: Observable<Hero[]>;

    // Subject is an RxJS object. which is both a source of observable values and itself an Observable.
    // So you can suscribe to a Subject just like any observable. You can also push items into it by calling the next(value) method
    private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) {}

 ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(

      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      // preserves the original request order while returning only the
      // observable from the most recent HTTP method call.
      // Results from prior calls are canceled and discarded.
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }

    // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }
}
