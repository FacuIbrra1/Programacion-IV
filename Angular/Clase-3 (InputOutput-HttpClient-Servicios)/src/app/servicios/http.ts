import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Character } from './models/character';
import { Observable } from 'rxjs';

@Service()
export class Http {

    httpClient = inject(HttpClient);
    //constructor(private httpClient : HttpClient){}

    TraeData(url: string): Observable<Character[]>{
        return this.httpClient.get<Character[]>(url);
    }

    post(url: string, body: any){
        return this.httpClient.post(url, body);
    }
}
