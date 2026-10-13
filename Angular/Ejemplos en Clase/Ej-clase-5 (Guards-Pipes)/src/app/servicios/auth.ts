import { Service } from '@angular/core';

@Service()
export class Auth {

    user = {
        username: 'pepe',
        password: '1234',
        role: 'vendedor',
        view: 'detalle'
    }

    login(username: string, password: string) {

        if (username === this.user.username && password === this.user.password) {
          
            localStorage.setItem('userMiApp', JSON.stringify(this.user));
            return true;
        } else {
            return false;
        }
    }

    logout() {
        localStorage.removeItem('userMiApp');
    }

    getCurrentUser() {
        const user = localStorage.getItem('userMiApp');
        return user ? JSON.parse(user) : null;
    }
}
