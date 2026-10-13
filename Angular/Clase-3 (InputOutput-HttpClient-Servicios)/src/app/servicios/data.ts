import { Service, signal } from '@angular/core';

@Service()
export class Data {
    numero = signal(0);

    agregar(){
        this.numero.update(n => n + 1);
    }

    restar(){
        this.numero.update(n => n - 1);
    }
}
