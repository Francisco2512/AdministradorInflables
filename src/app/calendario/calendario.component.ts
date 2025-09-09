import { Component, OnInit } from '@angular/core';
import { FullCalendarWrapperModule } from './full-calendar-wrapper.module';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import esLocale from '@fullcalendar/core/locales/es';
import dayGridPlugin from '@fullcalendar/daygrid';
import { ReservacionesService } from '../reservaciones/reservaciones.service';
import { Reservacion } from '../reservaciones/reservaciones.component';
import { InflablesService } from '../inflables/lista-inflables.component';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import Swal from 'sweetalert2';

interface Inflable {
  id: number;
  title: string;
  thumb: string;
  description: string;
  images?: string[];
}

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [FullCalendarWrapperModule, CommonModule, NgFor, NgIf],
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    locale: esLocale,
    events: [],
    eventClick: this.onEventClick.bind(this),
    titleFormat: { year: 'numeric', month: 'long' }
  };

  reservaciones: Reservacion[] = [];
  inflables: Inflable[] = [];

  // Modal control
  mostrarModal = false;
  modalReservacion?: Reservacion;
  inflablesArray: string[] = [];
  inflablesReservacion: Inflable[] = [];

  constructor(
    private reservacionesService: ReservacionesService,
    private inflablesService: InflablesService
  ) {}

  async ngOnInit() {
    await Promise.all([
      this.cargarEventosDesdeFirestore(),
      this.cargarInflables()
    ]);
  }

  async cargarInflables() {
    this.inflablesService.getInflables().subscribe(data => {
      this.inflables = data;
    });
  }

  async cargarEventosDesdeFirestore() {
    try {
      this.reservaciones = await this.reservacionesService.obtenerReservaciones();

      const eventos: EventInput[] = this.reservaciones.map(r => ({
        id: r.id,
        title: `${Array.isArray(r.inflable) ? r.inflable.join(', ') : r.inflable} - ${r.cliente}`,
        date: r.fecha
      }));

      this.calendarOptions = {
        ...this.calendarOptions,
        events: eventos
      };

    } catch (error) {
      console.error('Error al cargar reservaciones:', error);
    }
  }

  onEventClick(info: any) {
    const reservacion = this.reservaciones.find(r => r.id === info.event.id);
    if (!reservacion) return;

    this.modalReservacion = reservacion;
    this.inflablesArray = Array.isArray(reservacion.inflable)
      ? reservacion.inflable
      : [reservacion.inflable];

    this.inflablesReservacion = this.inflables.filter(i =>
      this.inflablesArray.includes(i.title)
    );

    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.modalReservacion = undefined;
    this.inflablesArray = [];
    this.inflablesReservacion = [];
  }
  copiarReservacion() {
  if (!this.modalReservacion) return;

  let texto = `Detalles de la reservación\n`; 
  texto += `Cliente: ${this.modalReservacion.cliente}\n`;
  texto += `Teléfono: ${this.modalReservacion.telefono}\n`;
  texto += `Inflables: ${this.inflablesArray.join(', ')}\n`;
  texto += `Fecha: ${this.modalReservacion.fecha}\n`;
  texto += `Hora: ${this.modalReservacion.horadeinicio}\n`;
  texto += `Domicilio: ${this.modalReservacion.domicilio}\n`;
  texto += `Pago: ${this.modalReservacion.pago}\n`;
  texto += `Maps: ${this.modalReservacion.maps}\n`;

  this.inflablesReservacion.forEach(i => {
    texto += `Imagen inflable: ${i.thumb}\n`;
  });

  // Intentar copiar al portapapeles
  navigator.clipboard.writeText(texto)
    .then(() => {
      Swal.fire({
        icon: 'success',
        title: '¡Datos de la reservación!',
        text: 'Los datos de la reservación se copiaron correctamente.',
        timer: 2000,
        showConfirmButton: false
      });
    })
    .catch((error) => {
      console.error('Error al copiar:', error);
      Swal.fire('Error', 'No se pudo copiar la información', 'error');
    });
}

  
}