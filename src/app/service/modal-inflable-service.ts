import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ModalInflableService {
  private inflableSeleccionado = new BehaviorSubject<string | null>(null);
  inflable$ = this.inflableSeleccionado.asObservable();

  abrirModal(inflable: string) {
    this.inflableSeleccionado.next(inflable);
  }

  cerrarModal() {
    this.inflableSeleccionado.next(null);
  }
}