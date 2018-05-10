import { Injectable } from '@angular/core';


// use the RxJS of() function to ensure this is observable. and change the getHeroes() method to implement
import { Observable, of } from 'rxjs';

// need this so i cn pipe details from the Observable
import { catchError, map, tap } from 'rxjs/operators';

// ensure we can use the message service as DI
import { MessageService } from './message.service';

// this service will feed data from our mock
import { Hero } from './hero';
// import { HEROES } from './mock-heroes';

// importing httpclient and headers so I can call webapi
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class HeroService {

   /** keep a private path for the webapi */
    private heroesUrl = 'api/heroes';


    constructor(
        private http: HttpClient,
        private messageService: MessageService) { }

    // originally just returned the Hero array imported above
    // now changed to return Observable<Hero[]>
    // now also adds a message to the message service.
    getHeroes(): Observable<Hero[]> {
            /** GET heroes from the server */
            this.log('fetched heroes from API');
            return this.http.get<Hero[]>(this.heroesUrl)
               .pipe(
                    /** tap looks at the observable values,
                    does somethign with values and passes them along.
                    tap doesn't touch the values themselves */
                    tap(x => this.log(`fetched heroes`)),
                    catchError(this.handleError('getHeroes', []))
    );

            // this.log('fetched heroes from mock');
            // return of(HEROES);
    }

    /** GET hero by id. Will 404 if id not found */
    getHero(id: number): Observable<Hero> {
      const url = `${this.heroesUrl}/${id}`;
        // instead of using array.find(), we modify the webapi url call
        // return of(HEROES.find(hero => hero.id === id));
      return this.http.get<Hero>(url).pipe(
        tap(_ => this.log(`fetched hero id=${id} '${_.name}'`)),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
    }

    /** PUT: update the hero on the server */
    updateHero (hero: Hero): Observable<Hero> {
      return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
        tap(_ => this.log(`updated hero id=${hero.id} to '${hero.name}'`)),
        catchError(this.handleError<any>('updateHero'))
      );
    }

    /** POST: add a new hero to the server */
    addHero (hero: Hero): Observable<Hero> {
      return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
          .pipe(
                tap((x: Hero) => this.log(`added hero w/ id=${x.id}`)),
                catchError(this.handleError<Hero>('addHero'))
      );
    }

    /** DELETE: delete the hero from the server */
    deleteHero (hero: Hero | number): Observable<Hero> {
      const id = typeof hero === 'number' ? hero : hero.id;
      const url = `${this.heroesUrl}/${id}`;

      return this.http.delete<Hero>(url, httpOptions)
          .pipe(
            tap(_ => this.log(`deleted hero id=${id}`)),
            catchError(this.handleError<Hero>('deleteHero'))
      );
    }

    /* GET heroes whose name contains search term */
    searchHeroes(term: string): Observable<Hero[]> {
      if (!term.trim()) {
        // if not search term, return empty hero array.
        return of([]);
      }
      return this.http.get<Hero[]>(`api/heroes/?name=${term}`).pipe(
        tap(_ => this.log(`found heroes matching "${term}"`)),
        catchError(this.handleError<Hero[]>('searchHeroes', []))
      );
    }


    // because i'm now going to log more often due to using HTTP, wrap the messaging service call in a method
    /** Log a HeroService message with the MessageService */
    private log(message: string) {
        let timestamp = new Date(Date.now());
        this.messageService.add('HeroService: ' + message + ' @ ' + timestamp);
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {

        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead

        // TODO: better job of transforming error for user consumption
        this.log(`${operation} failed: ${error.message}`);

        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }

}
