import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';


@Injectable()
export class HeroService {
	private heroesUrl = 'https://accedo-video-app-api.herokuapp.com/getProducts';  // URL to web api
	private heroUrl = 'https://accedo-video-app-api.herokuapp.com/getProduct'
	private updateHero = 'https://accedo-video-app-api.herokuapp.com/updateProduct';
	private addHero = 'https://accedo-video-app-api.herokuapp.com/addProduct';
	private deleteHero = 'https://accedo-video-app-api.herokuapp.com/deleteProduct';
	private headers = new Headers({'Content-Type': 'application/json'});

	constructor(private http: Http) { }

	getHeroes(): Promise<Hero[]> {
		return this.http.get(this.heroesUrl)
             .toPromise()
             .then(response => response.json() as Hero[])
             .catch(this.handleError);
	}

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}

	getHero(id: string): Promise<Hero> {
		const url = `${this.heroUrl}/${id}`;
		return this.http.get(url)
		    .toPromise()
		    .then(response => response.json() as Hero)
		    .catch(this.handleError);
	}

	update(hero: Hero): Promise<Hero> {
		const data = {};
		data['desc'] = "test description";
		data['price'] = "10";
		data['id'] = hero._id;
		data['name'] = hero.name;
		return this.http
		    .post(this.updateHero, JSON.stringify(data), {headers: this.headers})
		    .toPromise()
		    .then(() => data)
		    .catch(this.handleError);
	}

	create(name: string): Promise<Hero> {
		const data = {
			'name': name,
			'desc': "test description",
			'price': "10"
		};
		return this.http
		    .post(this.addHero, JSON.stringify(data), {headers: this.headers})
		    .toPromise()
		    .then(res => res.json().success as Hero)
		    .catch(this.handleError);
	}

	delete(id: string): Promise<void> {
		const url = `${this.deleteHero}/${id}`;
		return this.http.delete(url, {headers: this.headers})
		    .toPromise()
		    .then(() => null)
		    .catch(this.handleError);
	}

	// See the "Take it slow" appendix
	getHeroesSlowly(): Promise<Hero[]> {
		return new Promise(resolve => {
			// Simulate server latency with 2 second delay
			setTimeout(() => resolve(this.getHeroes()), 2000);
		});
	}
}