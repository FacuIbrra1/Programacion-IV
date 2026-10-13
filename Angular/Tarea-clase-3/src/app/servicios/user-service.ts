import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { User } from './models/user';
import { Observable } from 'rxjs';

@Service()
export class UserService {
    // Inyectamos el servicio HttpClient para realizar solicitudes HTTP
    private readonly httpClient = inject(HttpClient);

    getUsers(): Observable<User[]> {
        return this.httpClient.get<User[]>('https://jsonplaceholder.typicode.com/users');
    }
}
