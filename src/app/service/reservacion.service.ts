import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservacionService {
  obtenerReservaciones(): import("rxjs").Observable<unknown> {
    throw new Error('Method not implemented.');
  }
  getReservacion(id: string) {
    throw new Error('Method not implemented.');
  }

  constructor() { }
}
